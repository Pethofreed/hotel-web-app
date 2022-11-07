import { Box, Typography } from "@mui/material";
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';

const RoomCard = ({ room }) => {

   const sx = {
    color: 'white',
    width: '50px',
    height: '50px',
  }

  const colors = {
    free: 'success.light',
    occupied: 'error.light',
    cleaning: 'warning.light',
  };

  const estado = {
    free: 'Libre',
    occupied: 'Ocupado',
    cleaning: 'Limpieza',
  };

  const icon = {
    free: <BedroomParentRoundedIcon sx={sx} />,
    occupied: <BlockRoundedIcon sx={sx}  />,
    cleaning: <CleaningServicesRoundedIcon sx={sx}  />,
  };

  const { name, status } = room;

  return (
    <Box
      sx={{
        m: 2,
        width: '120px',
        height: '120px',
        bgcolor: colors[status],
        display: 'flex',
        borderRadius: '6px',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {icon[status]}
      <Typography sx={{ color: 'white' }} variant="h5">{name}</Typography>
      <Typography sx={{ color: 'white' }} variant="caption">{estado[status]}</Typography>
    </Box>
  )
}

export default RoomCard;
