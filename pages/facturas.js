import { useState } from 'react'
import moment from 'moment'
moment.locale('es');
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const facturas = () => {
  const classes = useStyles();

  const [facturas,setFacturas] = useState([])

  const getFacturas = async() => {
    const res = await fetch("/api/facturas")
    const resp = await res.json()
    setFacturas(resp)
  }

  getFacturas()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell># Factura</TableCell>
            <TableCell align="right">Cliente</TableCell>
            <TableCell align="right">Fecha de emisión</TableCell>
            <TableCell align="right">Fecha de entrega</TableCell>
            <TableCell align="right">Fecha de pago</TableCell>
            <TableCell align="right">Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facturas.length >0 && facturas.map(row => (
            <TableRow key={row.numerofactura}>
              <TableCell component="th" scope="row">
                {row.numerofactura}
              </TableCell>
              <TableCell align="right">{row.cliente}</TableCell>
              <TableCell align="right">{moment(row.fechaemision).format('DD/MM/YYYY')}</TableCell>
              <TableCell align="right">{moment(row.fechaentrega).format('DD/MM/YYYY')}</TableCell>
              <TableCell align="right">{moment(row.fechapago).format('DD/MM/YYYY')}</TableCell>
              <TableCell align="right">{row.monto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default facturas