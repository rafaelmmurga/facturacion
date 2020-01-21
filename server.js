const express = require('express')
const next = require('next')
const {
  login,
  searchfactura,
  getfacturas,
  insertFactura
} = require('./api/controllers/facturas')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

//const publicPath = path.resolve(__dirname, './public');
//app.use(express.static(publicPath));

app.prepare().then(() => {
    const server = express()

    server.get('/api/login', async(req, res) => {
      const mergedQuery = Object.assign({}, req.query, req.params, req.body)
      console.log(mergedQuery)
      res.json(await login(mergedQuery))
    })
    
    server.get('/api/facturas', async(req, res) => {
      res.json(await getfacturas())
    })

    server.post('/api/facturas', async(req, res) => {
      const mergedQuery = Object.assign({}, req.query, req.params, req.body)
      console.log(mergedQuery)
      res.json(await insertFactura(mergedQuery))
    })

    server.get('/api/facturas/:id', async(req, res) => {
        const mergedQuery = Object.assign({}, req.query, req.params)
        res.json(await searchfactura(mergedQuery))
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    const port = process.env.PORT || 3001

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on port ${port}...`)
    })
})

module.exports = app;