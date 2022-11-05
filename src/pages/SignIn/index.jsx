import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom"
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, Grid, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const image = "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80";

const SignIn = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    console.log('xxx iniciando sesion');
    navigate('dashboard')
    // setLoading(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Box
        sx={{
          width: '300px',
          display: 'flex',
          borderRadius: 2,
          p: { xs: 2, md: 4 },
          alignItems: 'center',
          flexDirection: 'column',
          height: { sm: '400px', md: '300px' },
          backgroundColor: '#FFFFFF',
        }}
      >
        <Avatar sx={{ bgcolor: '#9c27b0', mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>

        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', fontSize: 20 }}>
              Iniciar Sesion
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              label="Correo"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{
                autoComplete: 'new-password',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              label="Contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{
                autoComplete: 'new-password',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? (
              <CircularProgress  />
            ) : (
              <Button
                variant="contained"
                onClick={handleSignIn}
              >
                Iniciar
              </Button>
            )}
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
