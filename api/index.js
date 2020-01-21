const express = require ("express")
const bodyParser = require('body-parser');
const cors = require('cors')
const {insertFactura} = require('./controllers/facturas')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.post('/factura', async(req,res) => {
	res.json(await insertFactura(req.body))
})

app.get('/', (req,res) => {
	res.send("API")
})

app.listen("81")