import React, { useEffect, useState } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import BedIcon from '@mui/icons-material/Bed';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import DialogContentText from '@mui/material/DialogContentText';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { getRooms, setRooms, setRoomsError } from "../../store/reducers/rooms";
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { selectRooms } from "../../helpers/selectors";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#272639',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const icon = {
  free: <BedIcon sx={{ width:'15px' }} />,
  occupied: <BlockRoundedIcon sx={{ width:'15px' }} />,
  cleaning: <CleaningServicesRoundedIcon sx={{ width:'15px' }} />,
};

const statusColor = {
  free: 'success.light',
  occupied: 'error.light',
  cleaning: 'warning.light',
};

const ViewRooms = () => {

  const dispatch = useDispatch()
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [roomData, setRoomData] = useState({});
  const [message, setMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const { rooms = [] } = useSelector(selectRooms());

  useEffect(() => {
    dispatch(getRooms())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (roomData) setNewName(roomData.name)
  }, [roomData])

  function createData(_id, name, available, createdAt, status) {
    return {_id, name, available, createdAt, status };
  }

  function getDate(date) {
    const parsedDate = dayjs(date).locale('es').format('MMM D, YYYY');
    const parsedHour = dayjs(date).locale('es').format('h:mm A');
    return <span>{`${parsedDate} / ${parsedHour}`}</span>;
  }

  const changeRoomStatus = async (room) => {
    const { _id, name, available } = room;
    try {
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_MONARCA_HOST,
        url: '/rooms/update',
        data: { _id, available: !available }
      })
      dispatch(setRooms(data));
      setOpenModal(false);
      setError(false);
      showAlert(`Habitación #${name} || Cambio de "${available ? 'Disponible' : 'No disponible'}" =>  ${available ? 'No disponible' : 'Disponible'}`);
    } catch (error) {
      setOpenModal(false);
      setError(true);
      showAlert('Error intentando cambiar el estado, contacte al admin.');
      dispatch(setRoomsError(error))
    }
  };

  const changeRoomName = async (room) => {
    const { _id } = room;
    try {
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_MONARCA_HOST,
        url: '/rooms/update',
        data: { _id, name: newName }
      })
      dispatch(setRooms(data));
      setOpenModalEdit(false);
      showAlert('¡Cambio de nombre exitoso!');
      setError(false);
    } catch (error) {
      setOpenModalEdit(false);
      setError(true);
      showAlert('Error intentando cambiar el nombre, contacte al admin.');
      dispatch(setRoomsError(error));
    }
  };

  const dataReady = !!rooms && rooms.length > 0;
  const rows = dataReady && rooms.map((room) => createData(room._id, room.name, room.available, room.createdAt, room.status));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalEdit(false);
    setRoomData({});
  };

  const showAlert = (message) => {
    setOpen(true);
    setMessage(message);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Habitacion</StyledTableCell>
              <StyledTableCell>Estado</StyledTableCell>
              <StyledTableCell align="right">Fecha creación</StyledTableCell>
              <StyledTableCell align="right">Editar</StyledTableCell>
              <StyledTableCell align="right">Activa</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataReady && rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    sx={{ width: 24, height: 24, bgcolor: statusColor[row.status] }}
                  >
                    {icon[row.status]}
                  </Avatar>
                </TableCell>
                <TableCell align="right">
                  { getDate(row.createdAt)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setOpenModalEdit(true)
                      setRoomData({ ...row })
                      }
                    }
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setOpenModal(true)
                      setRoomData({ ...row })
                    }}
                  >
                    {row.available === true
                      ? <CheckCircleRoundedIcon sx={{ color: 'success.light' }} />
                      : <HighlightOffRoundedIcon sx={{ color: 'error.light' }} />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>

      {/* MODAL HABILITAR INHABILITAR MODAL HABILITAR INHABILITAR MODAL  HABILITAR INHABILITAR MODAL MODAL MODAL */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {roomData.status === 'free' || roomData.status === 'cleaning' ? (
          <>
            <DialogTitle id="alert-dialog-title">
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                <ChangeCircleRoundedIcon /> {`Cambiar estado de habitación => ${roomData.name}`}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Esta habitación se encuentra actualmente en modo ${roomData.available ? 'Disponible' : 'No disponible'}`}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                {`¿Desea cambiar su estado a "${roomData.available ? 'No disponible' : 'Disponible'}"?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>No</Button>
              <Button onClick={() => changeRoomStatus(roomData)} autoFocus variant="contained">
                Sí, cambiar
              </Button>
            </DialogActions>
          </>
          ) : (
            <>
              <DialogTitle id="alert-dialog-title">
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                  <ChangeCircleRoundedIcon /> {`Cambiar estado de habitación => ${roomData.name}`}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Esta habitación se encuentra actualmente ocupada
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  Para inhabilitarla debe terminar el contrato que se encuentra activo.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>salir</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

      {/* MODAL EDITAR MODAL EDITAR MODAL EDITAR MODAL EDITAR MODAL EDITAR MODAL EDITAR MODAL EDITAR MODAL EDITAR */}
      <Dialog
        open={openModalEdit}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
            <EditRoundedIcon /> {`Editar habitación => ${roomData.name}`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pt: 1 }} id="alert-dialog-description">
            <TextField
              size="small"
              label={error ? "Error" : "Nombre"}
              helperText={error && "Nombre obligatorio"}
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              inputProps={{
                autoComplete: 'new-password',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BedroomParentIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>cancelar</Button>
          <Button onClick={() => changeRoomName(roomData)} autoFocus variant="contained">
            guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewRooms;
