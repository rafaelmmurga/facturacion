const util = require( 'util' );
const mysql = require( 'mysql' );

var config = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'facturacion'
};

function makeDb( ) {
  const connection = mysql.createConnection( config );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

const db = makeDb();

module.exports = db; 