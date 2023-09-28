import { Box, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux"
import { selectSection } from "../../helpers/selectors";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '50px',
    backgroundColor: '#F0f0f0',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    boxSizing: 'border-box',
    borderBottom: '2px solid #ccc',
  },
  sectionTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    borderBottom: '2px solid #ccc',
    fontFamily: 'Lato, sans-serif',
    color: '#444',
  },
  welcome: {
    fontFamily: 'Lato, sans-serif',
  },
}));

const InfoBar = () => {

  const { classes } = useStyles();

  const { section } = useSelector(selectSection());

  return (
    <Box className={classes.container}>
      <Box>
        <Typography className={classes.sectionTitle}>
          {section}
        </Typography>
      </Box>
      <Typography sx={{ color: '#444' }} component="div">
        ¡Bienvenido!
      </Typography>
    </Box>
  )
}

export default InfoBar;
