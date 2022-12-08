import { Box } from "@mui/material";
import construction from '../../assets/construction.jpg';

const ManageTurn = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 50px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>En construcción...</h1>
      <img
        src={construction}
        alt="in-contruction"
        style={{
          width: '60%',
        }}
      />
    </Box>
  );
}

export default ManageTurn;
