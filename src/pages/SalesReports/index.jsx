import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllContracts } from '../../store/reducers/contract';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, IconButton, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Report from "../../components/watchReport";
import { selectRooms } from "../../helpers/selectors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#272639',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const status = {
  finished: "Finalizado",
  initiated
  : "Iniciado"
};

const SalesReports = () => {
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllContracts())
  },[])

  const [openModal, setOpenModal] =  useState (false);
  const [data, setData] =  useState ({});

  const handleChange = (data) => {
    setData(data);
    setOpenModal(!openModal)
  };

  const { allContracts } = useSelector(selectRooms());

  function createData(codeContract, contractStatus, dateOfAdmission, departureDate, phone, origin, destiny) {
    return {codeContract, contractStatus, dateOfAdmission, departureDate, phone, origin, destiny };
  }

  const dataReady = !!allContracts && allContracts.length > 0;
  const rows = dataReady && allContracts.map((contract) => createData(contract.codeContract, contract.contractStatus
    , contract.dateOfAdmission, contract.departureDate, contract.phone, contract.origin, contract.destiny));

  return (
    <Box sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 2
        }}
      >
          <Button variant="contained"> General </Button>
          <Button variant="contained"> Hoy </Button>
          <Button variant="contained"> Esta semana </Button>
          <Button variant="contained"> Este mes </Button>
          <Button variant="contained"> Este año </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>CODIGO</StyledTableCell>
              <StyledTableCell>ESTADO</StyledTableCell>
              <StyledTableCell>INGRESO</StyledTableCell>
              <StyledTableCell>SALIDA</StyledTableCell>
              <StyledTableCell>TELEFONO</StyledTableCell>
              <StyledTableCell>ORIGEN</StyledTableCell>
              <StyledTableCell>DESTINO</StyledTableCell>
              <StyledTableCell>VER</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataReady && rows.map((row) => (
              <TableRow
                key={row.codeContract}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.codeContract}
                </TableCell>
                <TableCell component="th" scope="row">
                  { status[row.contractStatus] }
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.dateOfAdmission}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.departureDate}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.phone}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.origin}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.destiny}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton onClick={() => handleChange(row)}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Report open={openModal} setValue={setOpenModal} roonData={data} />
    </Box>
  )
}

export default SalesReports;
