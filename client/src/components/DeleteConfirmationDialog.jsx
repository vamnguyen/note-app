/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onDeleteConfirm,
  typeIdToDelete,
  type,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Delete ${type}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to delete this ${type}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDeleteConfirm(typeIdToDelete);
          }}
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
