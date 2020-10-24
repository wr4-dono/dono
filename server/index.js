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
const verifyGiver = require('./middlewares/verifyGiver')
const verifyCarrier = require('./middlewares/verifyCarrier')
const verifyUser = require('./middlewares/verifyUser')
const chatCtrl = require('./chatController')




const donoCtrl = require('../server/donoController')
const authCtrl = require('./authController')
const prflCtrl = require('./profileController')

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

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
app.delete(`/api/users/:user_id/favorites/:dono_id`, favoritesCtrl.unfavoriteDono)
app.post(`/api/users/:user_id/favorites/:dono_id`, favoritesCtrl.favoriteDono)


//rating endpoints
app.get('/api/users/:user_id/ratings/giverrating', ratingsCtrl.getUserAverageGiverRating)
app.get('/api/users/:user_id/ratings/carrierrating', ratingsCtrl.getUserAverageCarrierRating)
app.post('/api/users/:dono_id/ratings/giver', verifyCarrier, ratingsCtrl.carrierRatesGiver)
app.post('/api/users/:dono_id/ratings/carrier', verifyGiver, ratingsCtrl.giverRatesCarrier)
app.post('/api/users/giveremail', ratingsCtrl.giverEmail)
app.post('/api/users/carrieremail', ratingsCtrl.carrierEmail)

//auth endpoints
app.post(`/api/auth/register`, authCtrl.register)
app.post(`/api/auth/login`, authCtrl.login)
app.delete(`/api/auth/logout`, authCtrl.logout)
app.get(`/api/auth/user`, authCtrl.getUser)
app.post('/api/auth/register/registeremail', authCtrl.registerEmail)

//donos endpoints
app.get('/api/donos', donoCtrl.getAllDonos);
app.get('/api/donos/:dono_id', donoCtrl.getDono);
app.post('/api/donos/', donoCtrl.createDono);
app.post('/api/donos/newdono/pictures', donoCtrl.savePictureURL);
app.put('/api/users/:user_id/dono/:dono_id', donoCtrl.acceptDono);
app.put('/api/donos/:dono_id', verifyGiver, donoCtrl.editDono);
app.put('/api/dono/:dono_id', donoCtrl.updateDonoStatus);
app.delete('/api/donos/:dono_id', verifyGiver, donoCtrl.deleteDono);
app.post('/api/donos/acceptedemail', donoCtrl.acceptedEmail)

app.get('/api/donos/pending/:user_id', donoCtrl.getPendingDonos)

//profile endpoints
app.put('/api/profile/edit', prflCtrl.editInfo)

//chat Endpoints
app.get('/api/chat/:chat_id', chatCtrl.getMessages);
app.get('/api/dono/:dono_id/chat', chatCtrl.getChatId);
app.post('/api/dono/:dono_id/chat', chatCtrl.initializeChat);
app.post('/api/chat/:chat_id/users/:user_id', chatCtrl.sendMessage);

//AWS bucket endpoint
app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
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



