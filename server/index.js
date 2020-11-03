require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const favoritesCtrl = require('./favoritesController')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const aws = require('aws-sdk');
const ratingsCtrl = require('./ratingsController')
const chatCtrl = require('./chatController')
const donoCtrl = require('../server/donoController')
const authCtrl = require('./authController')
const prflCtrl = require('./profileController')

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, S3_BUCKET, DONO_AWS_ACCESS_KEY_ID, DONO_AWS_SECRET_ACCESS_KEY } = process.env

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
  }));


//auth endpoints
app.get(`/api/auth/user`, authCtrl.getUser)
app.get('/api/auth/users/:user_id', authCtrl.getUsername)
app.post(`/api/auth/register`, authCtrl.register)
app.post(`/api/auth/login`, authCtrl.login)
app.delete(`/api/auth/logout`, authCtrl.logout)
app.post('/api/auth/register/registeremail', authCtrl.registerEmail)

//profile endpoints
app.put('/api/profile/edit', prflCtrl.editInfo)

//donos endpoints
app.get('/api/donos', donoCtrl.getAllDonos);
app.get('/api/donos/:dono_id', donoCtrl.getDono);
app.get('/api/donos/pending/:user_id', donoCtrl.getPendingDonos)
app.post('/api/donos/', donoCtrl.createDono);
app.post('/api/donos/newdono/pictures', donoCtrl.savePictureURL);
app.put('/api/users/:user_id/dono/:dono_id', donoCtrl.acceptDono);
app.put('/api/donos/:dono_id', donoCtrl.editDono);
app.put('/api/dono/:dono_id', donoCtrl.updateDonoStatus);
app.delete('/api/donos/:dono_id/users/:giver_id', donoCtrl.deleteDono);
app.post('/api/donos/acceptedemail', donoCtrl.acceptedEmail)

//favorites endpoints
app.get(`/api/users/:user_id/favorites`, favoritesCtrl.getAllFavorites)
app.post(`/api/users/:user_id/favorites/:dono_id`, favoritesCtrl.favoriteDono)
app.delete(`/api/users/:user_id/favorites/:dono_id`, favoritesCtrl.unfavoriteDono)

//chat Endpoints
app.get('/api/chat/:chat_id', chatCtrl.getMessages);
app.get('/api/dono/:dono_id/chat', chatCtrl.getChatId);
app.post('/api/dono/:dono_id/chat', chatCtrl.initializeChat);
app.post('/api/chat/:chat_id/users/:user_id', chatCtrl.sendMessage);

//rating endpoints
app.get('/api/users/:user_id/ratings/giverrating', ratingsCtrl.getUserAverageGiverRating)
app.get('/api/users/:user_id/ratings/carrierrating', ratingsCtrl.getUserAverageCarrierRating)
app.get('/api/users/:user_id/ratings', ratingsCtrl.getPendingRatingDonos)
app.post('/api/users/:dono_id/ratings/giver', ratingsCtrl.carrierRatesGiver)
app.post('/api/users/:dono_id/ratings/carrier', ratingsCtrl.giverRatesCarrier)
app.post('/api/users/giveremail', ratingsCtrl.giverEmail)
app.post('/api/users/carrieremail', ratingsCtrl.carrierEmail)


//AWS bucket endpoint
app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: DONO_AWS_ACCESS_KEY_ID,
    secretAccessKey: DONO_AWS_SECRET_ACCESS_KEY
  }

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});
//AWS Bucket endpoint ^^

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

//Below is the backend server part for Sockets
io.on('connection', socket => {
  socket.on('join', ({ chatId }) => {
    console.log('User connected to chat', { chatId })
    socket.join({ chatId })
  })
  socket.on('message', ({ username, message, chatId }) => {
    io.in({ chatId }).emit('message', { username, message })//what gets sent back to front end depending on chatId
  })
})

http.listen(4000, function () {
  console.log('listening on port 4000')
})



