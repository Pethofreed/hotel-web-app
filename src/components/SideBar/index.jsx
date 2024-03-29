import { makeStyles } from 'tss-react/mui';
import { Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import HailRoundedIcon from '@mui/icons-material/HailRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { changeSection } from '../../store/reducers/section';

const useStyles = makeStyles()((theme) => ({
  navSection: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.common.white,
    cursor: 'pointer',
    alignItems: 'center',
    p: theme.spacing(1),
  },
  flexInline: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    height: '1px',
    backgroundColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
  },
  iconButtonColor: {
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#bbb'
    }
  },
}));

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyles();

  const handleNavigate = (section, url) => {
    dispatch(changeSection(section));
    navigate(url);
  };

  const handleLogOut = () => {
    dispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('hotel-token');
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: '300px',
        height: '100vh',
        bgcolor: '#272639',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        fontFamily: 'Lato, sans-serif',
        p: 2,
      }}
    >
      <Box className={classes.navSection} onClick={() => handleNavigate('habitaciones', 'rooms')}>
        <Box className={classes.flexInline}>
          <IconButton className={classes.iconButtonColor}>
            <HomeRoundedIcon />
          </IconButton>
          <Typography className={classes.boldText}>
            INICIO
          </Typography>
        </Box>
        <KeyboardArrowRightRoundedIcon />
      </Box>

      <Box className={classes.divider} />

      <Box className={classes.navSection} onClick={() => handleNavigate('Administrador', 'manage-rooms')}>
        <Box className={classes.flexInline}>
          <IconButton className={classes.iconButtonColor}>
            <DomainAddRoundedIcon />
          </IconButton>
          <Typography className={classes.boldText}>
            ADMIN CUARTOS
          </Typography>
        </Box>
        <KeyboardArrowRightRoundedIcon />
      </Box>

      <Box className={classes.navSection} onClick={() => handleNavigate('reporte de ventas', 'sales-reports')}>
        <Box className={classes.flexInline}>
          <IconButton className={classes.iconButtonColor}>
            <ArticleRoundedIcon />
          </IconButton>
          <Typography className={classes.boldText}>
            REPORTES
          </Typography>
        </Box>
        <KeyboardArrowRightRoundedIcon />
      </Box>

      <Box className={classes.navSection} onClick={() => handleNavigate('Reservas', 'reservations')}>
        <Box className={classes.flexInline}>
          <IconButton className={classes.iconButtonColor}>
            <HailRoundedIcon />
          </IconButton>
          <Typography className={classes.boldText}>
            RESERVAS
          </Typography>
        </Box>
        <KeyboardArrowRightRoundedIcon />
      </Box>

      <Box className={classes.navSection} onClick={() => handleNavigate('Turno', 'turn')}>
        <Box className={classes.flexInline}>
          <IconButton className={classes.iconButtonColor}>
            <ChangeCircleIcon />
          </IconButton>
          <Typography className={classes.boldText}>
            MI TURNO
          </Typography>
        </Box>
        <KeyboardArrowRightRoundedIcon />
      </Box>

      <Box className={classes.divider} />

      <Box className={classes.navSection} onClick={handleLogOut}>
        <Box className={classes.flexInline}>
          <IconButton className={classes.iconButtonColor}>
            <PowerSettingsNewRoundedIcon />
          </IconButton>
          <Typography className={classes.boldText}>
            CERRAR SESION
          </Typography>
        </Box>
        <KeyboardArrowRightRoundedIcon />
      </Box>
    </Box>
  )
}

export default SideBar;
