import Alert from '@mui/material/Alert';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, InputAdornment } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ManageResources from '../ManageResources';

const useStyles = makeStyles()((theme) => ({
  roomsContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paper: {
    marginTop: theme.spacing(2),
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const ManageRooms = () => {
  const { classes } = useStyles();
  const [access, setAcceess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secretToken, setSecretToken] = useState('');
  const [tokenError, setTokenError] = useState(false);

  const handleTokenVerification = () => {
    setLoading(true);
    if (secretToken === 'admin') setAcceess(true);
    setTokenError(true);
    setLoading(false);
  };

  return (
    <Box className={classes.roomsContainer}>
      {!access ? (
        <>
          <Alert severity="warning">Esta sección es privada, para continuar ingrese su token.</Alert>
          <Box sx={{ boxShadow: 3 }} className={classes.paper}>
            <TextField
              size="small"
              error={tokenError}
              label={tokenError ? "Error" : "Token de ingreso"}
              helperText={tokenError && "Token incorrecto"}
              fullWidth
              value={secretToken}
              type="password"
              onChange={(e) => setSecretToken(e.target.value)}
              inputProps={{
                autoComplete: 'new-password',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box className={classes.flexCenter}>
              {loading ? (
                <CircularProgress  />
              ) : (
                <Button
                  variant="contained"
                  onClick={handleTokenVerification}
                  size="small"
                >
                  Autenticar
                </Button>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <ManageResources />
      )}
    </Box>
  )
}

export default ManageRooms;
