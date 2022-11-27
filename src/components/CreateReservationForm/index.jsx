import React, { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, NativeSelect, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { selectRooms } from '../../helpers/selectors';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateReservationForm = ({ handleClose }) => {

  const { rooms = [] } = useSelector(selectRooms());

  const roomNumbers = rooms.map(({ name }) => name);

  const [room, setRoom] = useState(roomNumbers?.[0]);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [reservationDate, setReservationDate] = useState(new Date());
  const [observations, setObservations] = useState('');

  const handleSubmit = async () => {
    try {
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_MONARCA_HOST || 'http://localhost:8000',
        url: '/contracts/finish',
        data: {
          room,
          phone,
          fullName,
          observations,
          reservationDate,
        },
      })
      // dispatch({type: 'CONTRACT_SUCCESS', payload: data })
      // showAlert('Contrato finalizado');
      // dispatch(getRooms());
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
              label="Cumpleaños"
              inputFormat="DD/MM/YYYY hh:mm a"
              value={reservationDate}
              onChange={(value) => setReservationDate(value)}
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

      <Grid xs={12} sx={{ mt: 2}}>
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
