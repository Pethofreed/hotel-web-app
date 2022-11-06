import { Box, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux"

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
  spanName: {
    color: '#272639',
    fontWeight: 'bold',
  },
  sectionTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    borderBottom: '2px solid #ccc',
  },
}));

const InfoBar = () => {

  const { classes } = useStyles();

  const {
    section
  } = useSelector(({SectionReducer})=> ({
    section: SectionReducer.section,
  }))

  return (
    <Box className={classes.container}>
      <Box>
        <Typography className={classes.sectionTitle}>
          {section}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar
          sx={{ width: 27, height: 27, bgcolor: '#9c27b0', }}
        >
          L
        </Avatar>
        <Typography component="div">
          ¡Hola <span className={classes.spanName}>Luis!</span>
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoBar;
