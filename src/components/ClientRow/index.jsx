import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Grid, InputAdornment, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';


const ClientRow = ({ index, setValue }) => {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [identificationCard, setIdentificationCard] = useState('');
  const data = { identificationCard, name, lastname };

  const handleChange = () => {
    setValue(prev => ({
      ...prev,
      [index]: data,
    }));
  };

  useEffect(() => {
    handleChange()
  }, [identificationCard, name, lastname])

  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Cedula"
          value={identificationCard}
          variant="standard"
          onChange={(e) => setIdentificationCard(e.target.value)}
          inputProps={{
            autoComplete: 'new-password',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Nombres"
          value={name}
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Apellidos"
          value={lastname}
          variant="standard"
          onChange={(e) => setLastname(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  )
}

export default ClientRow;
