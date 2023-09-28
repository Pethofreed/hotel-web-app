import React from 'react';
import Slide from '@mui/material/Slide';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography } from "@mui/material";
import CreateReservationForm from '../../components/CreateReservationForm';
import { getReservations } from '../../store/reducers/reservations';
import ViewReservations from '../../components/ViewReservations';
import { changeSection } from '../../store/reducers/section';
import CloseIcon from '@mui/icons-material/Close';
import { getRooms } from '../../store/reducers/rooms';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflowY: 'auto',
    maxHeight: 500,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
      {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Reservations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(0);
  const token = localStorage.getItem('hotel-token');

  useEffect(() => {
    if (!token) navigate('/')
    dispatch(getReservations())
    dispatch(getRooms())
    setOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseModal = () => {
    setOpen(false);
    dispatch(changeSection('habitaciones'));
    navigate('../');
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BootstrapDialog
      fullWidth
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
        <PendingActionsIcon />  Gestión de reservas
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography variant="h5" textAlign="center">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Lista Reservas" {...a11yProps(0)} />
              <Tab label="Crear" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ViewReservations />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateReservationForm
              handleClose={handleCloseModal}
              changeTab={setValue}
            />
          </TabPanel>
        </Box>
        </Typography>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default Reservations;
