import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import InfoBar from "../../components/InfoBar";
import CircularProgress from '@mui/material/CircularProgress';
import { Suspense } from "react";

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
        <Suspense
          fallback={
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress color="inherit" />
            </Box>
          }
        >
          <InfoBar />
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  )
}

export default Dashboard;
