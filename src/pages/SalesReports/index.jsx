import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { getAllContracts } from '../../store/reducers/contract';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box, Button, Divider, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { selectContracts } from "../../helpers/selectors";
import Report from "../../components/watchReport";
import { filterReports } from "../../helpers/dates";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import moment from "moment";

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
  initiated: "Iniciado"
};

const parseFilter = {
  today: "Hoy",
  week: " Esta semana",
  month: "Este mes",
  year: "Este año",
};

const SalesReports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('hotel-token');

  useEffect(() => {
    if (!token) navigate('/')
    dispatch(getAllContracts())
  },[])

  const [openModal, setOpenModal] =  useState (false);
  const [filter, setFilter] =  useState('general');
  const [filterActive, setFilterActive] = useState(false);
  const [data, setData] =  useState ({});

  const handleChange = (data) => {
    setData(data);
    setOpenModal(!openModal)
  };

  const { allContracts } = useSelector(selectContracts());

  const filteredData = filterReports(allContracts, filter);

  function createData(
    codeContract,
    contractStatus,
    dateOfAdmission,
    departureDate,
    phone,
    origin,
    destiny,
    room,
    birthday,
    country,
    profession,
    company,
    nit,
    email,
    rate,
    baggage,
    wayToPay,
    renters
  ) {
    return {
      codeContract,
      contractStatus,
      dateOfAdmission,
      departureDate,
      phone,
      origin,
      destiny,
      room,
      birthday,
      country,
      profession,
      company,
      nit,
      email,
      rate,
      baggage,
      wayToPay,
      renters
    };
  }

  const dataReady = !!filteredData && filteredData.length > 0;
  const rows = dataReady && filteredData.map((contract) => createData(
    contract.codeContract, contract.contractStatus,
    contract.dateOfAdmission, contract.departureDate,
    contract.phone, contract.origin, contract.destiny,
    contract.room, contract.birthday, contract.country,
    contract.company, contract.nit, contract.profession,
    contract.email, contract.rate,  contract.baggage,
    contract.wayToPay, contract.renters
  ));

  return (
    <Box sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 2
        }}
      >
        <Button
          startIcon={<SearchIcon />}
          variant="contained"
          onClick={() => {
            setFilterActive(!filterActive)
          }}
        >
          Buscar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilter('today');
            if (filterActive) setFilterActive(false);
          }}
        >
          Hoy
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilter('week');
            if (filterActive) setFilterActive(false);
          }}
        >
          Esta semana
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilter('month');
            if (filterActive) setFilterActive(false);
          }}
        >
          Este mes
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilter('year');
            if (filterActive) setFilterActive(false);
          }}
        >
          Este año
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilter('general');
            if (filterActive) setFilterActive(false);
          }}
        >
          Total
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {(filter !== 'general' && !filterActive) && (
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            justifyContent: 'center',
            gap: 3,
            my: 1,
          }}
        >
          Filtrado: {parseFilter[filter]}
        </Typography>
      )}
      {!filterActive && (
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
                    {moment(row.dateOfAdmission).format('L LT')}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moment(row.departureDate).format('L LT')}
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
        </TableContainer>)}
      {!rows.length && (
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            justifyContent: 'center',
            gap: 3,
            mt: 3,
          }}
        >
          <ErrorOutlineIcon />  No se encontraron registros
        </Typography>
      )}
      <Report open={openModal} setValue={setOpenModal} roomData={data} />
    </Box>
  )
}

export default SalesReports;
