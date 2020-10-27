const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

module.exports = {
  register: async (req, res) => {

    const db = req.app.get('db')

    const { username, password, userState, zip_code, email } = req.body
    const [user] = await db.check_user([username])

    if (user) {
      return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const [newUser] = await db.register_user([username, hash, userState, zip_code, email])

    // req.session.user = newUser

    // res.status(200).send(req.session.user)

    res.status(200).send(newUser)

  },

  login: async (req, res) => {

    const db = req.app.get('db')

    const { username, password } = req.body

    const [existingUser] = await db.check_user([username])

    if (!existingUser) {
      return res.status(404).send('User not found')
    }

    const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

    if (!isAuthenticated) {
      return res.status(403).send('Incorrect username or password')
    }

    delete existingUser.hash

    //put user on session
    req.session.user = existingUser

    res.status(200).send(req.session.user)

  },

  getUser: async (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found')
    }

  },

  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  registerEmail: async (req, res) => {
    const { EMAIL_ACCOUNT, EMAIL_PASS } = process.env
    const { username, email } = req.body

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASS
      }
    })

    let notification = {
      from: EMAIL_ACCOUNT,
      to: email,
      subject: 'Thank you for registering with dono.',
      html:
        `<div style='font-family: Gill Sans, sans-serif; color: black; font-size: 18px;'>
        <h1 style ='font-size: 20px' >Hi ${username}, </h1>
        <div><p>Thank you for registering with dono.</p></div>
        <div><p>Items are ready for pickup right now!</p></div>
        <div><p>Login to see what we've got or submit your own dono!</p></div>
        <div><p>Thanks,</p></div>
        <div><p>The dono. Team</p></div>
         </div>`
    }

    transporter.sendMail(notification, (err, info) => {
      console.log(notification)
      if (err) {
        console.log('notification error');
      } else {
        console.log('Notification sent');
      }
    })

    res.sendStatus(201);
  },

  getUsername: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    console.log('useid', user_id)
    const [username] = await db.get_username(user_id);
    console.log(username.username)
    res.status(200).send(username.username);
  }




}
