/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import NewFolder from "./NewFolder";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { deleteFolderById } from "../utils/folderUtils";
import { toast } from "react-toastify";

const FolderList = ({ folders }) => {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const popupDeleteFolder = searchParams.get("popupDelFolder");
  const idToDelete = searchParams.get("idDelete");

  const handleOpenPopup = (id) => {
    setSearchParams({ popupDelFolder: "delete-folder", idDelete: id });
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleDeleteFolder = async (folderId) => {
    const deletedFolder = await deleteFolderById(folderId);
    if (deletedFolder) {
      // deleted successfully
      toast.success("Deleted Folder successfully!");
      handleClose();
    } else {
      console.log("Delete Note failed :(");
      toast.error("Deleted Folder failed :(");
      handleClose();
    }
  };

  useEffect(() => {
    if (popupDeleteFolder === "delete-folder") {
      setOpen(true);
      return;
    }

    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupDeleteFolder]);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "7px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folders?.map(({ id, name }) => (
        <Link
          key={id}
          to={`folders/${id}`}
          style={{
            textDecoration: "none",
          }}
          onClick={() => setActiveFolderId(id)}
        >
          <Card
            sx={{
              mb: "5px",
              backgroundColor:
                id === activeFolderId ? "rgb(255 211 140)" : null,
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
              onDeleteConfirm={handleDeleteFolder}
              typeIdToDelete={idToDelete}
              type={"Folder"}
            />
            <CardContent
              sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                {name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </List>
  );
};

export default FolderList;
