import { Box, Button, Dialog, DialogActions, DialogContent, Divider, Typography } from "@mui/material";
import moment from "moment";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { generatePDF } from "../PDF";

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
        <h3>
          INFORMACION DEL CONTRATO
        </h3>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              mb: 1,
            }}
          >
            <Typography>
              CODIGO: N°{codeContract}
            </Typography>
            <Typography>
              ESTADO: {status[contractStatus]}
            </Typography>
            <Typography>
              HABITACION: {room}
            </Typography>
            <Typography>
              PRECIO: {rate}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              mb: 1,
            }}
          >
            <Typography>
              ORIGEN: {origin}
            </Typography>
            <Typography>
              DESTINO: {destiny}
            </Typography>
            <Typography>
              PAIS: {country}
            </Typography>
            <Typography>
              CUMPLEAÑOS: {moment(birthday).format('L')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              mb: 1,
            }}
          >
            <Typography>
              PROFESION: {profession}
            </Typography>
            <Typography>
              EMPRESA: {company}
            </Typography>
            <Typography>
              NIT: {nit}
            </Typography>
            <Typography>
              TELEFONO: {phone}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              mb: 1,
            }}
          >
            <Typography>
              EMAIL: {email}
            </Typography>
            <Typography>
              MODO DE PAGO: {payMode[wayToPay]}
            </Typography>
            <Typography>
              EQUIPAJE: {parseBaggage[baggage]}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              mb: 1,
            }}
          >
            <Typography>
              INGRESO: {moment(dateOfAdmission).format('L LT')}
            </Typography>
            <Typography>
              SALIDA: {moment(departureDate).format('L LT')}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h5">Huespedes</Typography>
          </Box>
          {Object.values(renters).map((renter, index) => (
            <Box
              key={renter.identificationCard}
              sx={{
                display: 'flex',
                gap: 5,
                mb: 2,
              }}
            >
            <Typography>
              N° {index +1}
            </Typography>
            <Typography>
              IDENTIFICACION: {renter.identificationCard}
            </Typography>
            <Typography>
              NOMBRES: {renter.name}
            </Typography>
            <Typography>
              APELLIDOS: {renter.lastname}
            </Typography>
            </Box>
          ))}

        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 3}}>
          <Button onClick={handleCloseModal}>SALIR</Button>
          <Button
              variant="contained"
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
