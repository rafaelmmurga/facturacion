import React,{ useState } from 'react';
import moment from 'moment'
moment.locale('es');
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/AddCircle';
import AllInbox from '@material-ui/icons/AllInbox';
import InputAdornment from '@material-ui/core/InputAdornment';

import Facturas from './Facturas'

const drawerWidth = 240;

const useStyles1 = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const useStyles2 = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  card: {
    minWidth: 275,
    marginTop: '1rem',
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
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ClippedDrawer() {

  const classes1 = useStyles1();
  const classes2 = useStyles2();
  const [spacing, setSpacing] = useState(2);
  const [factura, setFactura] = useState({});
  const [numeroFactura, setNumeroFactura] = useState();
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [nuevaFactura, setNuevaFactura] = useState(true);
  const [mostrar, setMostrar] = useState("Form");

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
        fechaemision:"",fechaentrega:"",fechapago:"",monto:"",
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

  const changeMonto = e => {
    let monto = e.target.value
    setFactura(prevState=>({...prevState,monto}))
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
      cliente,fechaemision,fechaentrega,fechapago,monto,
      formapago,cheque,recibo,observaciones} = factura

    if(cliente != "" && fechaemision != "" && fechaentrega != "" && fechapago != ""
      && monto != "" && formapago != "" && cheque != "" && recibo != "" && observaciones != ""){
      
      let datos = `?numerofactura=${numeroFactura}&cliente=${cliente}&fechaemision=${fechaemision}&fechaentrega=${fechaentrega}&fechapago=${fechapago}&monto=${monto}&formapago=${formapago}&cheque=${cheque}&recibo=${recibo}&observaciones=${observaciones}`
      const res = await fetch('/api/facturas'+datos, {
        method: 'POST'
      })
      const resp = await res.json()
      let {message} = resp
      console.log(message)
      if(message == "ok"){
        alert("Factura guardada")
        setFactura({
          cliente:"",
          fechaemision:"",fechaentrega:"",fechapago:"",monto:"",
          formapago:"",cheque:"",recibo:"",observaciones:""
        })
        setNuevaFactura(true)
        setMostrarFactura(false)
      }
    }
    else {
      alert("te faltan datos")
    }
  }

  const getTodas = () => <facturas/>

  const Form = 
    <Grid container justify="center" spacing={spacing}>
      <Card className={classes2.card}>
        <CardContent>  
          <Typography variant="body2" component="p">
          <form className={classes2.root} noValidate autoComplete="off" onSubmit={e=>e.preventDefault()}>
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
                <InputLabel htmlFor="monto">Monto</InputLabel>
                <Input
                  id="monto"
                  type="number"
                  value={factura.monto}
                  onChange={changeMonto}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
                <InputLabel htmlFor="monto">Monto</InputLabel>
                <Input
                  id="monto"
                  type="number"
                  value={factura.monto}
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
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

  return (
    <div className={classes1.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes1.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            FACTURACIÓN
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes1.drawer}
        variant="permanent"
        classes1={{
          paper: classes1.drawerPaper,
        }}
      >
        <div className={classes1.toolbar} />
        <List>
          <ListItem button>
            <ListItemIcon>{<AddCircle />}</ListItemIcon>
            <ListItemText primary="Nueva" onClick={() => setMostrar("Form")} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>{<AllInbox />}</ListItemIcon>
            <ListItemText primary="Todas" onClick={() => setMostrar("Facturas")} />
          </ListItem>            
        </List>
        <Divider />
      </Drawer>
      <main className={classes1.content}>
        <div className={classes1.toolbar} />        
          {
            mostrar == "Form"
            ? Form
            : <Facturas/>
          }     
      </main>
    </div>
  );
}