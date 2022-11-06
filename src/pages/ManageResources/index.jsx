import { useState } from "react";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from 'tss-react/mui';
import { Box, Typography } from "@mui/material";
import CreateRoom from "../../components/CreateRoom";

const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ManageResources = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.mainContainer}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
        <Tab label="Habitaciones" {...a11yProps(0)} />
        <Tab label="Crear" {...a11yProps(1)} />
        <Tab label="Modificar" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        Acá la lista de rooms
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateRoom />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Actualizar, eliminar, etc
      </TabPanel>
    </Box>
  )
}

export default ManageResources;
