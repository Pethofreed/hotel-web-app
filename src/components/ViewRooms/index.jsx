import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { IconButton } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#272639',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ViewRooms = () => {

  function createData(name, available, createdAt) {
    return { name, available, createdAt };
  }

  const getDate = (date) => {
    const DDMMYYYY = date.split('T');
    const hour = DDMMYYYY[1].split('.');
    return `${DDMMYYYY[0]} | ${hour[0]}`;
  };

  const rows = [
    createData('101', 'true', '2022-11-06T17:56:17.153Z',),
    createData('102', 'false', '2022-11-06T17:56:17.153Z'),
    createData('201', 'false', '2022-11-06T17:56:17.153Z'),
    createData('202', 'true', '2022-11-06T17:56:17.153Z'),
    createData('203', 'true', '2022-11-06T17:56:17.153Z'),
  ];

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Habitacion</StyledTableCell>
            <StyledTableCell align="right">Fecha creación</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Activa</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                { getDate(row.createdAt)}
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditRoundedIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  {row.available === 'true'
                    ? <CheckCircleRoundedIcon sx={{ color: 'success.light' }} />
                    : <HighlightOffRoundedIcon sx={{ color: 'error.light' }} />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewRooms;
