import React, { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, NativeSelect, TextField } from '@mui/material';
import { getReservations, setReservations } from '../../store/reducers/reservations';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { selectRooms } from '../../helpers/selectors';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const CreateReservationForm = ({ handleClose, changeTab }) => {

  const dispatch = useDispatch();
  const { rooms = [] } = useSelector(selectRooms());

  const roomNumbers = rooms.map(({ name }) => name);

  const [room, setRoom] = useState(roomNumbers?.[0]);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [reservationDate, setReservationDate] = useState(new Date());
  const [observations, setObservations] = useState('');

  const handleChangeDate = (newValue) => {
    setReservationDate(new Date(newValue));
  };

  const handleSubmit = async () => {
    try {
      const body = {
        room,
        phone,
        fullName,
        observations,
        reservationDate,
        status: 'active',
      };

      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_MONARCA_HOST || 'http://localhost:8000',
        url: '/reservations/create',
        data: body,
      })

      dispatch(setReservations(data));
      // showAlert('La reserva ha sido registrada');
      dispatch(getReservations());
      changeTab(0);
      // setOpenModal(false);
      // setError(false);
    } catch (error) {
      // setError(true);
      // showAlert('Ha ocurrido un error, contacte al admin.');
      // dispatch({type: 'CONTRACT_ERROR', payload: error })
    }
  };

  return (
    <Box
      sx={{
        py: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <TextField
            size="small"
            label="Nombre completo"
            value={fullName}
            variant="standard"
            onChange={(e) => setFullName(e.target.value)}
            inputProps={{
              autoComplete: 'new-password',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <TextField
            size="small"
            label="Telefono"
            value={phone}
            variant="standard"
            onChange={(e) => setPhone(e.target.value)}
            inputProps={{
              autoComplete: 'new-password',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid xs={12} md={6} sx={{ mt: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Fecha reserva"
              inputFormat="DD/MM/YYYY hh:mm a"
              value={reservationDate}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid xs={12} md={6} sx={{ mt: 3 }}>
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Habitación
            </InputLabel>
            <NativeSelect
              defaultValue={roomNumbers[0]}
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              inputProps={{
                name: 'Habitación',
                id: 'uncontrolled-native',
              }}
            >
              {roomNumbers.map(name => (
                <option value={name}>{name}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>

        <Grid xs={12} sx={{ mt: 4}}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            size="small"
            label="Observaciones"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid xs={12} sx={{ mt: 2}} textAlign="end">
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
        >
          Crear
        </Button>
      </Grid>
    </Box>
  )
}

export default CreateReservationForm;
