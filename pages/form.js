import React,{ useState } from 'react';
import moment from 'moment'
moment.locale('es');
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  card: {
    minWidth: 275,
    marginTop: '2rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function form() {
  const classes1 = useStyles1();
  const classes = useStyles();
  const [spacing, setSpacing] = useState(2);
  const [factura, setFactura] = useState({});
  const [numeroFactura, setNumeroFactura] = useState();
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [nuevaFactura, setNuevaFactura] = useState(true);

  const changeNumerofactura = async(e) => {
    setNumeroFactura(e.target.value)
    const res = await fetch(`/api/facturas/${e.target.value}`)
    const resp = await res.json()
    console.log(resp)
    if(resp.length > 0) {
      setFactura(resp[0])
      setNuevaFactura(false)
    } 
    else{
      setFactura({
        cliente:"",
        fechaemision:"",fechaentrega:"",fechapago:"",
        formapago:"",cheque:"",recibo:"",observaciones:""
      })
      setNuevaFactura(true)
    }
    setMostrarFactura(true)
  }

  const changeCliente = e => {
    let cliente = e.target.value
    setFactura(prevState=>({...prevState,cliente}))
  }

  const changeFechaEmision = e => {
    let fechaemision = e.target.value
    setFactura(prevState=>({...prevState,fechaemision}))
  }
  
  const changeFechaEntrega = e => {
    let fechaentrega = e.target.value
    setFactura(prevState=>({...prevState,fechaentrega}))
  }

  const changeFechaPago = e => {
    let fechapago = e.target.value
    setFactura(prevState=>({...prevState,fechapago}))
  }

  const changeFormaPago = e => {
    let formapago = e.target.value
    setFactura(prevState=>({...prevState,formapago}))
  }

  const changeCheque = e => {
    let cheque = e.target.value
    setFactura(prevState=>({...prevState,cheque}))
  }

  const changeRecibo = e => {
    let recibo = e.target.value
    setFactura(prevState=>({...prevState,recibo}))
  }

  const changeObservaciones = e => {
    let observaciones = e.target.value
    setFactura(prevState=>({...prevState,observaciones}))
  }

  const guardarFactura = async() => {
    let {
      cliente,fechaemision,fechaentrega,fechapago,
      formapago,cheque,recibo,observaciones} = factura

    if(cliente != "" && fechaemision != "" && fechaentrega != "" && fechapago != ""
      && formapago != "" && cheque != "" && recibo != "" && observaciones != ""){
      
      let datos = `?numerofactura=${numeroFactura}&cliente=${cliente}&fechaemision=${fechaemision}&fechaentrega=${fechaentrega}&fechapago=${fechapago}&formapago=${formapago}&cheque=${cheque}&recibo=${recibo}&observaciones=${observaciones}`
      const res = await fetch('/api/facturas'+datos, {
        method: 'POST'
      })
      const resp = await res.json()
      let {message} = resp
      alert(message)
      if(message == "ok"){
        setFactura({
          cliente:"",
          fechaemision:"",fechaentrega:"",fechapago:"",
          formapago:"",cheque:"",recibo:"",observaciones:""
        })
        setNuevaFactura(true)
        setMostrarFactura(false)
      }
    }
    alert("te faltan datos")
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes1.root}>
        <AppBar position="static">
          <Toolbar>            
            <Typography variant="h6" className={classes1.title}>
              FACTURACIÓN
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
                
          <Grid container justify="center" spacing={spacing}>
          <Card className={classes.card}>
          <CardContent>  
            <Typography variant="body2" component="p">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={e=>e.preventDefault()}>
            Digita tu factura
              <div>             
                <TextField 
                  required 
                  label="# de factura" 
                  onChange={changeNumerofactura}
                />   
              </div>                   
            </form>
            {
                mostrarFactura 
                &&
                (
                nuevaFactura
                ?
                <>
                <div>                
                  <TextField 
                    required 
                    label="Cliente" 
                    value={factura.cliente}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeCliente}
                  />                
                </div>
                <div>                
                  <TextField 
                    type="date"
                    required 
                    label="Fecha de emisión" 
                    value={moment(factura.fechaemision).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeFechaEmision}
                  />                
                </div>
                <div>                
                  <TextField 
                    type="date"
                    required 
                    label="Fecha de entrega"  
                    value={moment(factura.fechaentrega).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeFechaEntrega}
                  />                
                </div>
                <div>                
                  <TextField 
                    type="date"
                    required 
                    label="Fecha de pago"  
                    value={moment(factura.fechapago).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeFechaPago}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="Forma de pago"  
                    value={factura.formapago}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeFormaPago}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="cheque"  
                    value={factura.cheque}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeCheque}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="Recibo"  
                    value={factura.recibo}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeRecibo}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="Observaciones"  
                    value={factura.observaciones}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeObservaciones}
                  />                
                </div>
                <Button variant="contained" color="primary" onClick={guardarFactura}>
                  Guardar
                </Button>
                </>
                :
                <>
                <div>                
                  <TextField 
                    required 
                    label="Cliente" 
                    value={factura.cliente}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                <div>                
                  <TextField 
                    type="date"
                    required 
                    label="Fecha de emisión" 
                    value={moment(factura.fechaemision).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                <div>                
                  <TextField 
                    type="date"
                    required 
                    label="Fecha de entrega"  
                    value={moment(factura.fechaentrega).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                <div>                
                  <TextField 
                    type="date"
                    required 
                    label="Fecha de pago"  
                    value={moment(factura.fechapago).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="Forma de pago"  
                    value={factura.formapago}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="cheque"  
                    value={factura.cheque}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="Recibo"  
                    value={factura.recibo}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                <div>                
                  <TextField 
                    required 
                    label="Observaciones"  
                    value={factura.observaciones}
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                    }}
                  />                
                </div>
                </>
                )
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>      
    </ThemeProvider>
  );
}