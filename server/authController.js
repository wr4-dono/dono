const bycryt = require ('bcryptjs')

module.exports = {
  register: async (req, res) => { 

    const db = req.app.get('db')

    const {username, password, zip_code, email} = req.body
    const [user] = await db.check_user([username])

    if(user) {
      return res.status(409).send('User already exists')
    }

    const salt = bycryt.genSaltSync(10)
    const hash = bycryt.hashSync(password, salt)

    const [newUser] = await db.register_user([username, hash, zip_code, email])

    req.session.user = newUser
    
    res.status(200).send(req.session.user)

   },
   
  login: async (req, res) => {

    const db = req.app.get('db')

    const {username, password} = req.body
    
    const [existingUser] = await db.check_user([username])

    if (!existingUser) {
      return res.status(404).send('User not found')
    }

    const isAuthenticated = bycryt.compareSync(password, existingUser.hash)

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
    req.session.destroy()
    res.sendStatus(200)
   }
}
