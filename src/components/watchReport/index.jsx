import { Box, Button, Dialog, DialogContent, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import TagIcon from '@mui/icons-material/Tag';
import PaidIcon from '@mui/icons-material/Paid';
import FlagIcon from '@mui/icons-material/Flag';
import CakeIcon from '@mui/icons-material/Cake';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LuggageIcon from '@mui/icons-material/Luggage';
import PaymentsIcon from '@mui/icons-material/Payments';
import BusinessIcon from '@mui/icons-material/Business';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { generatePDF } from "../PDF";
import dayjs from "dayjs";

import One from '@mui/icons-material/LooksOne';
import Two from '@mui/icons-material/LooksTwo';
import Three from '@mui/icons-material/Looks3';
import Four from '@mui/icons-material/Looks4';
import Five from '@mui/icons-material/Looks5';

const useStyles = makeStyles()((theme) => ({
  sutitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato, Sans-serif',
    textTransform: 'Uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
  text: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  labelIcon: {
    width: 16,
    height: 16,
  },
}));

const numberIcon = {
  1: <One />,
  2: <Two />,
  3: <Three />,
  4: <Four />,
  5: <Five />,
};

const status = {
  finished: "Finalizado",
  initiated: "Iniciado"
};

const payMode = {
  cash: 'Efectivo',
  card: 'Tarjeta'
}

const parseBaggage = {
  true: 'Si',
  false: 'No'
}

const Report = ({ open, setValue, roomData  }) => {
  const { classes } = useStyles();

  const parseDate = (date) => dayjs(date).locale('es').format('MMM D, YYYY');
  const parseHour = (date) => dayjs(date).locale('es').format('h:mm A');

  const handleCloseModal = () => {
    setValue (!open)
  };


  const {
    codeContract,
    contractStatus,
    room,
    origin,
    destiny,
    birthday,
    country,
    profession,
    company,
    nit,
    phone,
    rate,
    wayToPay,
    email,
    dateOfAdmission,
    departureDate,
    baggage,
    renters = {},
  } = roomData;

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >

      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <AssignmentIcon />
          <Typography sx={{ fontFamily: 'Lato, sans-serif' }} variant="h6">INFORMACION DEL CONTRATO</Typography>
        </Box>
        <Grid container spacing={1}>
          {/* FIRST ROW */}
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <QrCodeIcon className={classes.labelIcon} />
              código
            </Typography>
            <Typography className={classes.text}>
              N° {codeContract}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <MultipleStopIcon className={classes.labelIcon} />
              estado
            </Typography>
            <Typography className={classes.text}>
              {status[contractStatus]}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <BedroomChildIcon className={classes.labelIcon} />
              habitación
            </Typography>
            <Typography className={classes.text}>
              {room}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <PaidIcon className={classes.labelIcon} />
              precio
            </Typography>
            <Typography className={classes.text}>
              {rate}
            </Typography>
          </Grid>

          {/* SECOND ROW */}
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <TimeToLeaveIcon className={classes.labelIcon} />
              origen
            </Typography>
            <Typography className={classes.text}>
              {origin}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <TimeToLeaveIcon className={classes.labelIcon} />
              destino
            </Typography>
            <Typography className={classes.text}>
              {destiny}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <FlagIcon className={classes.labelIcon} />
              país
            </Typography>
            <Typography className={classes.text}>
              {country}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <CakeIcon className={classes.labelIcon} />
              cumpleaños
            </Typography>
            <Typography className={classes.text}>
              {parseDate(birthday)}
            </Typography>
          </Grid>

          {/* third row */}
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <EngineeringIcon className={classes.labelIcon} />
              profesión
            </Typography>
            <Typography className={classes.text}>
              {profession}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <BusinessIcon className={classes.labelIcon} />
              empresa
            </Typography>
            <Typography className={classes.text}>
              {company}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <TagIcon className={classes.labelIcon} />
              nit
            </Typography>
            <Typography className={classes.text}>
              {nit}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <LocalPhoneIcon className={classes.labelIcon} />
              teléfono
            </Typography>
            <Typography className={classes.text}>
              {phone}
            </Typography>
          </Grid>

          {/* FOURTH ROW */}
          <Grid item xs={12} md={6}>
            <Typography className={classes.sutitle}>
              <AlternateEmailIcon className={classes.labelIcon} />
              email
            </Typography>
            <Typography className={classes.text}>
              {email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <PaymentsIcon className={classes.labelIcon} />
              modo de pago
            </Typography>
            <Typography className={classes.text}>
              {payMode[wayToPay]}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.sutitle}>
              <LuggageIcon className={classes.labelIcon} />
              equipaje
            </Typography>
            <Typography className={classes.text}>
              {parseBaggage[baggage]}
            </Typography>
          </Grid>

          {/* FIFTH ROW */}
          <Grid item xs={12} md={6}>
            <Typography className={classes.sutitle}>
              <LoginIcon className={classes.labelIcon} />
              ingreso
            </Typography>
            <Typography className={classes.text}>
              {`${parseDate(dateOfAdmission)} / ${parseHour(dateOfAdmission)}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={classes.sutitle}>
              <LogoutIcon className={classes.labelIcon} />
              salida
            </Typography>
            {departureDate ? (
              <Typography className={classes.text}>
                {`${parseDate(departureDate)} / ${parseHour(departureDate)}`}
              </Typography>
            ) : (
              <Typography className={classes.text}>
                no
              </Typography>
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'center',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <GroupIcon />
              <Typography variant="h5">Huespedes</Typography>
            </Box>
          </Box>
          <Grid container rowSpacing={1}>
            {Object.values(renters).map((renter, index) => {
              return (
                <>
                  <Grid item xs={12} md={1}>
                    <Typography sx={{  height: '100%', display: 'flex', alignItems: 'center' }} className={classes.sutitle}>
                      {numberIcon[index + 1]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography className={classes.sutitle}>
                      identificación
                    </Typography>
                    <Typography className={classes.text}>
                      {renter.identificationCard}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography className={classes.sutitle}>
                      nombres
                    </Typography>
                    <Typography className={classes.text}>
                      {renter.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography className={classes.sutitle}>
                      apellidos
                    </Typography>
                    <Typography className={classes.text}>
                      {renter.lastname}
                    </Typography>
                  </Grid>
                </>
              )
            })}
          </Grid>

        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 3}}>
          <Button onClick={handleCloseModal}>SALIR</Button>
          <Button
              variant="outlined"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => generatePDF(roomData)}
              sx={{
                ml: 2,
              }}
            >
              Generar PDF
            </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Report;
