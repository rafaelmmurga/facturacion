const db = require( '../dbmysql' );

const login = async({password}) => {
  try {
    const res = await db.query( 
      `SELECT * FROM usuarios WHERE password = '${password}'` 
    );
    if(res.length > 0){
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
  try {
    const res = await db.query( 
      `SELECT 
      numerofactura,cliente,fechaemision,fechaentrega,fechapago,
      formapago,cheque,recibo,observaciones 
      FROM facturas` 
    );
    return res
  } catch ( err ) {
    console.log("ERROR:",err)
  } finally {
    //await db.close();
  }
}

const searchfactura = async({id}) => {
  try {
    const res = await db.query( 
      `SELECT 
      numerofactura,cliente,fechaemision,fechaentrega,fechapago,
      formapago,cheque,recibo,observaciones 
      FROM facturas WHERE numerofactura = '${id}'` 
    );
    return res
  } catch ( err ) {
    console.log("ERROR:",err)
  } finally {
    //await db.close();
  }
}

const validarFactura = async(numerofactura) => {
  try {
    const res = await db.query( 
      `SELECT 
      numerofactura,cliente,fechaemision,fechaentrega,fechapago,
      formapago,cheque,recibo,observaciones 
      FROM facturas WHERE numerofactura = '${numerofactura}'` 
    );
    return res
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
  formapago,
  cheque,
  recibo,
  observaciones
}) => {
  const res = await validarFactura(numerofactura);

  if(res.length == 0) {
    try {
      const res = await db.query( 
        `INSERT INTO facturas(numerofactura,cliente,fechaemision,fechaentrega,fechapago,formapago,cheque,recibo,observaciones) 
        VALUES ('${numerofactura}','${cliente}','${fechaemision}','${fechaentrega}','${fechapago}','${formapago}','${cheque}','${recibo}','${observaciones}')` 
      );
      //console.log("ok")
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