import React, { useState } from "react";
import Slide from '@mui/material/Slide';
import { Box, Typography } from "@mui/material";
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoomCard = ({ room }) => {

  const [openModal, setOpenModal] = useState(false);

   const sx = {
    color: 'white',
    width: '50px',
    height: '50px',
  }

  const colors = {
    free: 'success.light',
    occupied: 'error.light',
    cleaning: 'warning.light',
  };

  const hover = {
    free: 'success.main',
    occupied: 'error.main',
    cleaning: 'warning.main',
  };

  const estado = {
    free: 'Libre',
    occupied: 'Ocupado',
    cleaning: 'Limpieza',
  };

  const icon = {
    free: <BedroomParentRoundedIcon sx={sx} />,
    occupied: <BlockRoundedIcon sx={sx}  />,
    cleaning: <CleaningServicesRoundedIcon sx={sx}  />,
  };

  const { name, status } = room;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box
        sx={{
          m: 2,
          width: '120px',
          height: '120px',
          bgcolor: colors[status],
          display: 'flex',
          borderRadius: '6px',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: 3,
          transition: '0.4s',
          '&:hover': {
            bgcolor: hover[status],
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        {icon[status]}
        <Typography sx={{ color: 'white' }} variant="h5">{name}</Typography>
        <Typography sx={{ color: 'white' }} variant="caption">{estado[status]}</Typography>
      </Box>

      {/* MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL */}
      <Dialog
        open={openModal}
        fullWidth
        maxWidth="md"
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="create-contract"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
            Cambiar estado de habitación
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            hola
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            hola
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleCloseModal} autoFocus variant="contained">
            Sí, cambiar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RoomCard;
