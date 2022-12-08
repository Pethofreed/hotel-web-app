import Card from '@mui/material/Card';
import BedIcon from '@mui/icons-material/Bed';
import CardActions from '@mui/material/CardActions';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import NumbersIcon from '@mui/icons-material/Numbers';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Box } from '@mui/material';
import Button from '@mui/material/Button';

const ReservationCard = ({ data }) => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Avatar>
              {data?.fullName[0]}
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                color: '#555'
              }}
            >
              {data.fullName}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 10,
              height: 10,
              bgcolor: 'success.light',
              borderRadius: '50%',
            }}
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            ml: 1.5,
            width: '100%',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              gap: 5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3
              }}
            >
              <LocalPhoneIcon /> {data.phone}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3
              }}
            >
              <BedIcon /> {data.room}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3
              }}
            >
              <NumbersIcon /> {data.codeReservation}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'start',
            ml: 2,
            mt: 2,
          }}
        >
          <Typography>
            {data.observations}
          </Typography>
        </Box>
        </CardContent>
      <CardActions>
        <Button
        sx={{
          color: 'error.main'
        }}
          size="small"
        >
          Desactivar reserva
        </Button>
      </CardActions>
    </Card>
  );
}

export default ReservationCard;
