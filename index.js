const express = require('express')
const { getConnection } = require('./db/connect-mongo')

const app = express()
const port = 4000


getConnection();

app.director('/director', require('./routes/director'))

app.use('/genero', require('./routes/genero'));


app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})
