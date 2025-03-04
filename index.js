const express = require('express')
const { getConnection } = require('./db/connect-mongo')

const app = express()
const port = 4000


getConnection();

app.use('/director', require('./routes/director'))

app.use('/genero', require('./routes/genero'));
app.use('/tipo', require('./routes/tipo'));
app.use('/media', require('./routes/media'));


app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})
