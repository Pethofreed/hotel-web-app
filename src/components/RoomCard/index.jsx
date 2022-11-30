import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { generatePDF } from "../PDF";
import ClientRow from "../ClientRow";
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import PinIcon from '@mui/icons-material/Pin';
import WorkIcon from '@mui/icons-material/Work';
import FlagIcon from '@mui/icons-material/Flag';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PublicIcon from '@mui/icons-material/Public';
import { getRooms } from "../../store/reducers/rooms";
import { useDispatch, useSelector } from "react-redux";
import { selectContracts } from "../../helpers/selectors";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { getContracts } from '../../store/reducers/contract';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { setContracts, setError as setContractError } from '../../store/reducers/contract';
import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

const RoomCard = ({ room }) => {

  const { contracts = [] } = useSelector(selectContracts());
  const { name, status } = room;
  const dataReady = !!contracts && contracts.length > 0;

  useEffect(() => {
    dispatch(getContracts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch();
  const [nit, setNit] = useState('');
  const [rate, setRate] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState('');
  const [renters, setRenters] = useState({});
  const [destiny, setDestiny] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [baggage, setBaggage] = useState(true);
  const [message, setMessage] = useState(false);
  const [contractId, setContractId] = useState('');
  const [profession, setProfession] = useState('');
  const [wayToPay, setWayToPay] = useState('cash');
  const [openModal, setOpenModal] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [numberClients, setNumberClients] = useState([1]);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [dateOfAdmission, setDateOfAdmission] = useState(new Date());

  const defaultValues = useMemo(() => {
    if (status === 'occupied' && dataReady) {
      const [{
        _id, origin, destiny, country, profession, company, nit, birthday, room: roomName,
        phone, email, rate, baggage, wayToPay, renters, dateOfAdmission, codeContract,
      } = {}] = contracts?.filter((data) => data.room === room.name);

      const values = {
        _id,
        nit,
        rate,
        phone,
        email,
        origin,
        renters,
        baggage,
        destiny,
        country,
        company,
        birthday,
        wayToPay,
        profession,
        codeContract,
        room: roomName,
        dateOfAdmission,
      };
      return values;
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }}, [contracts]);


  const showAlert = (message) => {
    setOpen(true);
    setMessage(message);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getNumberOfClients = (number) => {
    const clients = [];
    let cont = 1;
    while (cont <= number) {
      clients.push(cont);
      cont++
    }
    return clients;
  }

  useEffect(() => {
    if (status === 'occupied' && dataReady) {
      const {
        _id, origin, destiny, country, profession, company, nit, birthday,
        phone, email, rate, baggage, wayToPay, renters, dateOfAdmission,
      } = defaultValues;
      setNit(nit);
      setRate(rate);
      setEmail(email);
      setPhone(phone);
      setOrigin(origin);
      setContractId(_id);
      setDestiny(destiny);
      setCountry(country);
      setCompany(company);
      setBaggage(baggage);
      setRenters(renters);
      setBirthday(birthday);
      setWayToPay(wayToPay);
      setProfession(profession);
      setDateOfAdmission(dateOfAdmission);
      const length = Object.keys(renters).length;
      setNumberClients(getNumberOfClients(length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataReady])


  const handleCloseModal = () => {
    setOpenModal(false);
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
          baseURL: process.env.REACT_APP_MONARCA_HOST || 'http://localhost:8000',
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
        showAlert('¡Contrato creado!');
        dispatch(setContracts(data));
        dispatch(getRooms());
        setOpenModal(false);
        setError(false);
      } catch (error) {
        setError(true);
        showAlert('Ha ocurrido un error, contacte al admin.');
        dispatch(setContractError(error));
      }
    } else {
      setError(true)
      showAlert("Faltan campos por llenar")
    }
  };

  const handleFinishContract = async () => {
    console.log(contractId)
    try {
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_MONARCA_HOST || 'http://localhost:8000',
        url: '/contracts/finish',
        data: {
          _id: contractId,
          roomId: room._id,
          departureDate,
          contractStatus: 'finished',
        },
      })
      dispatch(setContracts(data))
      showAlert('Contrato finalizado');
      dispatch(getRooms());
      setOpenModal(false);
      setError(false);
    } catch (error) {
      setError(true);
      showAlert('Ha ocurrido un error, contacte al admin.');
      dispatch(setContractError(error))
    }
  };

  const handleEnableRoom = async () => {
    try {
      await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_MONARCA_HOST || 'http://localhost:8000',
        url: '/rooms/update',
        data: {
          _id: room._id,
          status: 'free',
        },
      })
      showAlert('Habitación ahora disponible');
      dispatch(getRooms());
      dispatch(getContracts());
      setOpenModal(false);
      setError(false);
    } catch (error) {
      setError(true);
      showAlert('Ha ocurrido un error, contacte al admin.');
      dispatch(setContractError(error))
    }
  };

  const handleAction = {
    free: () => handleCreateContract(),
    occupied: () => handleFinishContract(),
    cleaning: () => handleEnableRoom(),
  };

  const handleModal = () => {
    setOpenModal(true)
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
        onClick={handleModal}
      >
        {icon[status]}
        <Typography sx={{ color: 'white' }} variant="h5">{name}</Typography>
        <Typography sx={{ color: 'white' }} variant="caption">{estado[status]}</Typography>
      </Box>

      <Stack spacing={2}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>

      {/* MODAL CONTRACT MODAL CONTRACT MODAL CONTRACT MODAL CONTRACT MODAL CONTRACT MODAL CONTRACT */}
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          {`Contrato | Habitación: ${name} ${room.status === 'occupied' ? '|' : ''}`}
          {room.status === 'occupied' && (
            <Button
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => generatePDF(defaultValues)}
              sx={{
                ml: 2,
              }}
            >
              Generar PDF
            </Button>
          )}
        </BootstrapDialogTitle>
        {(room.status === 'cleaning' ? (
          <DialogContent dividers>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                <CleaningServicesRoundedIcon fontSize="large"/>
                <Typography variant="h5">
                  Esta habitación se encuentra en proceso de limpieza
                </Typography>
              </Box>
          </DialogContent>
        ) : (
          <DialogContent dividers>
            <Grid container spacing={2}>

              {numberClients?.map(index => (
                <ClientRow key={index} value={renters} setValue={setRenters} index={index} />
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Cumpleaños"
                    inputFormat="DD/MM/YYYY"
                    value={birthday}
                    onChange={(value) => setBirthday(value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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
                    inputFormat="DD/MM/YYYY hh:mm A"
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
                    inputFormat="DD/MM/YYYY hh:mm A"
                    value={departureDate}
                    onChange={(value) => setDepartureDate(value)}
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
        ))}
        <DialogActions>
          <Button
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAction[status]}
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
