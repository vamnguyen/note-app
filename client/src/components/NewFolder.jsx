import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { addNewFolder } from "../utils/folderUtils";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewFolder = () => {
  const [newFolderName, setNewFolderName] = useState("");
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const popupName = searchParams.get("popup");

  const handleOpenPopup = () => {
    setSearchParams({ popup: "add-folder" });
  };

  const handleClose = () => {
    setNewFolderName("");
    navigate(-1);
  };

  const handleNewFolderNameChange = (e) => setNewFolderName(e.target.value);

  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log("handleAddNewFolder ~ addFolder:", addFolder);
    toast.success("Add new Folder success!");
    handleClose();
  };

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupName]);

  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewFolder;
