import axios from "axios";
import ClientRow from "../ClientRow";
import React, { useState } from "react";
import Slide from '@mui/material/Slide';
import { useDispatch } from "react-redux";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import PinIcon from '@mui/icons-material/Pin';
import WorkIcon from '@mui/icons-material/Work';
import FlagIcon from '@mui/icons-material/Flag';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { getRooms } from "../../store/RoomReducer";
import PublicIcon from '@mui/icons-material/Public';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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

const RoomCard = ({ room }) => {

  const dispatch = useDispatch();
  const [renters, setRenters] = useState({});
  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');
  const [country, setCountry] = useState('');
  const [profession, setProfession] = useState('');
  const [company, setCompany] = useState('');
  const [nit, setNit] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfAdmission, setDateOfAdmission] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [rate, setRate] = useState('');
  const [baggage, setBaggage] = useState(true);
  const [wayToPay, setWayToPay] = useState('cash');
  const [openModal, setOpenModal] = useState(false);
  const [numberClients, setNumberClients] = useState([1]);

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

  const labelButton = {
    free: 'Crear contrato',
    occupied: 'Terminar contrato',
    cleaning: 'Habilitar',
  }

  const { name, status } = room;

  const handleCloseModal = () => {
    setOpenModal(false);
    setNumberClients([1])
  };

  const handleClientsPerRoom = () => {
    if (numberClients.length < 5) setNumberClients(prev => [...prev, prev.length + 1])
  };

  const validation = () => {

    const registeredRenters = Object.values(renters);

    if (!registeredRenters[0].identificationCard || !registeredRenters[0].name || !registeredRenters[0].lastname) return false;
    if (!phone) return false;
    return true;
  };

  const handleCreateContract = async () => {
    if (validation()) {
      try {
        const { data } = await axios({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER || 'http://localhost:8000',
          url: '/contracts/create',
          data: {
            renters,
            origin,
            destiny,
            country,
            profession,
            company,
            nit,
            birthday,
            phone,
            email,
            dateOfAdmission,
            rate: parseInt(rate),
            baggage,
            wayToPay,
            room: name,
            roomId: room._id,
            contractStatus: 'initiated',
          },
        })
        dispatch({type: 'CONTRACT_SUCCESS', payload: data })
        dispatch(getRooms());
        setOpenModal(false);
      } catch (error) {
        dispatch({type: 'CONTRACT_ERROR', payload: error })
      }
    }
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
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          {`Contrato | Habitación: ${name}`}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>

            {numberClients.map(index => (
              <ClientRow key={index} setValue={setRenters} index={index} />
            ))}

            <Grid item xs={12} justify="flex-end">
              <Box display="flex" justifyContent="flex-end">
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleClientsPerRoom}
                >
                  añadir
                </Button>
              </Box>
            </Grid>

            {/* ORIGIN DESTINY COUNTRY */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Procedencia"
                value={origin}
                variant="standard"
                onChange={(e) => setOrigin(e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Destino"
                value={destiny}
                variant="standard"
                onChange={(e) => setDestiny(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DirectionsBusIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Pais"
                value={country}
                variant="standard"
                onChange={(e) => setCountry(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlagIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/*   PROFESSION COMPANY NIT */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Profesión"
                value={profession}
                variant="standard"
                onChange={(e) => setProfession(e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Empresa"
                value={company}
                variant="standard"
                onChange={(e) => setCompany(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ApartmentIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="NIT"
                value={nit}
                variant="standard"
                onChange={(e) => setNit(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* BIRTHDAY PHONE EMAIL */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                label="Cumpleaños"
                value={birthday}
                variant="standard"
                onChange={(e) => setBirthday(e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono"
                value={phone}
                variant="standard"
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                value={email}
                type="email"
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ my: 2 }}>
              <Divider />
            </Grid>

            {/* DATE OF ADMISSION DEPARTURE RATE */}
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  readOnly
                  fullWidth
                  label="Fecha ingreso"
                  value={dateOfAdmission}
                  onChange={(e) => setDateOfAdmission(e.target.value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  readOnly
                  fullWidth
                  label="Fecha salida"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Precio"
                value={rate}
                variant="outlined"
                onChange={(e) => setRate(e.target.value)}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label">Maletas</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={baggage}
                  label="Maletas"
                  onChange={(e) => setBaggage(e.target.value)}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label">Pago</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={wayToPay}
                  label="Pago"
                  onChange={(e) => setWayToPay(e.target.value)}
                >
                  <MenuItem value="cash">Efectivo</MenuItem>
                  <MenuItem value="card">Tarjeta</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>

        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateContract}
            startIcon={<CheckIcon />}
            variant="contained"
            size="small"
            sx={{
              bgcolor: 'success.light',
              '&:hover': {
                bgcolor: 'success.main',
              },
            }}
          >
            {labelButton[status]}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default RoomCard;
