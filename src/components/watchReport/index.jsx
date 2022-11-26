import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";


const Report = ({ open, setValue, roomData  }) => {

  const handleCloseModal = () => {
    setValue (!open)
  };
  console.log(roomData);
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <h1>Content should be here</h1>
    </Dialog>
  )
}

export default Report;
