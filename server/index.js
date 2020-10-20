require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const favoritesCtrl = require('./favoritesController')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const ratingsCtrl = require('./ratingsController')


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


app.get(`/api/users/:user_id/favorites`, favoritesCtrl.getAllFavorites)
app.delete(`/api/users/:user_id/favorites/:favorites_id`, favoritesCtrl.unfavoriteDono)
app.post(`/api/users/:user_id/favorites/:dono_id`, favoritesCtrl.favoriteDono)




//rating endpoints
app.get('/api/users/:user_id/ratings/giverrating', ratingsCtrl.getUserAverageGiverRating)
app.get('/api/users/:user_id/ratings/carrierrating', ratingsCtrl.getUserAverageCarrierRating)
app.post('/api/users/:dono_id/ratings/giver', ratingsCtrl.carrierRatesGiver)
app.post('/api/users/:dono_id/ratings/carrier', ratingsCtrl.giverRatesCarrier) //figure out the req.params here. could be dono_id on params instead of user_id. those ids are already generated in the donos table when a dono is completed.

//auth endpoints
app.post(`/api/auth/register`, authCtrl.register)
app.post(`/api/auth/login`, authCtrl.login)
app.delete(`/api/auth/logout`, authCtrl.logout)
app.get(`/api/auth/user`, authCtrl.getUser)

//donos endpoints
app.get('/api/donos', donoCtrl.getAllDonos);
app.get('/api/donos/:dono_id', donoCtrl.getDono);
app.post('/api/donos/', donoCtrl.createDono);
app.put('/api/users/:user_id/donos/:dono_id', donoCtrl.acceptDono);
app.put('/api/donos/:dono_id', donoCtrl.editDono);
app.put('/api/dono/:dono_id', donoCtrl.updateDonoStatus);
app.delete('/api/donos/:dono_id', donoCtrl.deleteDono);


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



