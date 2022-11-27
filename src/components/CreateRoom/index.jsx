import axios from "axios"
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { useDispatch } from "react-redux";
import { makeStyles } from 'tss-react/mui';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import { setRooms, setRoomsError } from '../../store/reducers/rooms';
import { Box, Button, CircularProgress, InputAdornment } from "@mui/material";

const useStyles = makeStyles()((theme) => ({
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateRoom = () => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [available, setAvailable] = useState(true);
  const token = localStorage.getItem("hotel-app-token");

  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      const { data } = await axios ({
        method: 'POST',
        baseURL: process.env.REACT_APP_MONARCA_HOST || 'http://localhost:8000',
        url: '/rooms/create',
        data: { name, available, status: 'free' },
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // },
      })
      dispatch(setRooms(data));
      showAlert('Se ha creado con exito.');
      setLoading(false);
      setName('');
      setError(false);
    } catch (error) {
      dispatch(setRoomsError(error))
      setError(true);
      showAlert('Hubo un problema, no se pudo crear, contacte al admin.');
      setLoading(false)
    }
  };

  const handleChangeStatus = (event) => {
    setAvailable(event.target.value);
  };

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

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <TextField
          size="small"
          label={error ? "Error" : "Numero de habitación o ID"}
          helperText={error && "Habitación ya existe"}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          inputProps={{
            autoComplete: 'new-password',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddHomeRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box className={classes.flexCenter}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Estado:</FormLabel>
            <RadioGroup
              row
              value={available}
              defaultValue={true}
              onChange={handleChangeStatus}
            >
              <FormControlLabel value={true} control={<Radio />} label="Activa" />
              <FormControlLabel value={false} control={<Radio />} label="Inactiva" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box className={classes.flexCenter}>
          {loading ? (
            <CircularProgress  />
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => setName('')}
                size="small"
                sx={{ mr: 4 }}
              >
                cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleCreateRoom}
                size="small"
              >
                crear
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  )
}

export default CreateRoom;
