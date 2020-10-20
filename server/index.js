require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const donoCtrl = require('../server/donoController')
const authCtrl = require('./authController')

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
  })
)

//auth endpoints
app.post(`/api/auth/register`, authCtrl.register)
app.post(`/api/auth/login`, authCtrl.login)
app.delete(`/api/auth/logout`, authCtrl.logout)
app.get(`/api/auth/user`, authCtrl.getUser)

//donos endpoints
app.get('/api/donos', donoCtrl.getAllDonos);
app.get('/api/donos/:dono_id', donoCtrl.getDono);
app.post('/api/donos/', donoCtrl.createDono);
app.put('/api/users/:user_id/dono/:dono_id', donoCtrl.acceptDono);
app.put('/api/donos/:dono_id', donoCtrl.editDono);
app.delete('/api/donos/:dono_id', donoCtrl.deleteDono);

app.post('/api/donos/acceptTest', donoCtrl.acceptTest)


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB ready!')
  app.listen(SERVER_PORT, () =>
    console.log(`Server ready on port ${SERVER_PORT}`)
  )
})


io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

http.listen(4000, function () {
  console.log('listening on port 4000')
})



