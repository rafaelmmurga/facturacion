const pool = require( '../dbpostgress' );

const login = async({password}) => {
  try {
    const res = await pool.query('SELECT * FROM usuarios ORDER BY id ASC')
    if(res.rows.length > 0){
      return {"message": "ok"}
    }
    else{
      return {"message": "contraseña incorrecta"}
    }

  } catch ( err ) {
    return {"message": err}
  } finally {
    //await db.close();
  }
}

const getfacturas = async() => {
  const res = await pool.query('SELECT * FROM facturas ORDER BY fechaemision DESC')
  return res.rows
}

const searchfactura = async({id}) => {
  try {
    const res = await pool.query(`SELECT 
    numerofactura,cliente,fechaemision,fechaentrega,fechapago,monto
    formapago,cheque,recibo,observaciones 
    FROM facturas WHERE numerofactura = '${id}'`)
    return res.rows
  } catch ( err ) {
    console.log("ERROR:",err)
  } finally {
    //await db.close();
  }
}

const validarFactura = async(numerofactura) => {
  try {
    const res = await pool.query(`SELECT 
    numerofactura,cliente,fechaemision,fechaentrega,fechapago,monto
    formapago,cheque,recibo,observaciones 
    FROM facturas WHERE numerofactura = '${numerofactura}'`)
    return res.rows
  } catch ( err ) {
    console.log("ERROR:",err)
  } finally {
    //await db.close();
  }
}

const insertFactura = async({
  numerofactura,
  cliente,
  fechaemision,
  fechaentrega,
  fechapago,
  monto,
  formapago,
  cheque,
  recibo,
  observaciones
}) => {
  const res = await validarFactura(numerofactura);

  if(res.length == 0) {
    try {
      await pool.query(`INSERT INTO facturas(numerofactura,cliente,fechaemision,fechaentrega,fechapago,monto,formapago,cheque,recibo,observaciones) 
      VALUES ('${numerofactura}','${cliente}','${fechaemision}','${fechaentrega}','${fechapago}',${monto},'${formapago}','${cheque}','${recibo}','${observaciones}')`)

      return {
        "message":"ok"
      }      
    } catch ( err ) {
      console.log("ERROR:",err)
    } finally {
      //await db.close();
    }
  }
  else{
    //console.log("la factura ya fué registrada")
    return {
      "message":"la factura ya fué registrada"
    }    
  }
}

//insertFactura(1)

module.exports = {
  login,
  searchfactura,
  getfacturas,
  insertFactura
}