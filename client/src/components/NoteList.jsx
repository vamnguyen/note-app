import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { NoteAddOutlined } from "@mui/icons-material";
import moment from "moment";
import { deleteNoteById } from "../utils/noteUtils";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const NoteList = () => {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { folder } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  // delete Note feature
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const popupDelNote = searchParams.get("popupDel");
  const idToDeleteNote = searchParams.get("idDeleteNote");

  const handleOpenPopup = (id) => {
    setSearchParams({ popupDel: "delete-note", idDeleteNote: id });
  };

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!folder) navigate(-1);

    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder?.notes]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folders/${folderId}` }
    );
    toast.success("Add new Note success!");
  };

  const handleDeleteNote = async (noteId) => {
    const deletedNote = await deleteNoteById(noteId);
    if (deletedNote) {
      // deleted successfully
      toast.success("Deleted Note successfully!");
      handleClose();
    } else {
      console.log("Delete Note failed :(");
      toast.error("Deleted Note failed :(");
      handleClose();
    }
  };

  useEffect(() => {
    if (popupDelNote === "delete-note") {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupDelNote]);

  return (
    <Grid container height={"100%"}>
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#F0EBE3",
          height: "100%",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "7px",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder?.notes?.map(({ id, content, updatedAt }) => (
            <Link
              key={id}
              to={`note/${id}`}
              style={{ textDecoration: "none" }}
              onClick={() => setActiveNoteId(id)}
            >
              <Card
                sx={{
                  mb: "5px",
                  backgroundColor:
                    id === activeNoteId ? "rgb(255 211 140)" : null,
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "#f44336",
                    color: "white",
                    "&:hover": { bgcolor: "#c4564f" },
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking delete button
                    e.preventDefault();
                    handleOpenPopup(id);
                  }}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "small",
                    }}
                  />
                </IconButton>

                {/* Add DeleteConfirmationDialog */}
                <DeleteConfirmationDialog
                  open={open}
                  onClose={handleClose}
                  onDeleteConfirm={handleDeleteNote}
                  typeIdToDelete={idToDeleteNote}
                  type={"Note"}
                />

                <CardContent
                  sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                >
                  <div
                    style={{ fontSize: 14, fontWeight: "bold" }}
                    dangerouslySetInnerHTML={{
                      __html: `${content.substring(0, 30) || "Empty"}`,
                    }}
                  />
                  <Typography sx={{ fontSize: "10px", marginTop: "3px" }}>
                    {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </List>
      </Grid>

      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default NoteList;
