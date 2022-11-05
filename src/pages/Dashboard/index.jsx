import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import InfoBar from "../../components/InfoBar";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box>
        <SideBar />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <InfoBar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Dashboard;
