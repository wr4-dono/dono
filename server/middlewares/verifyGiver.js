module.exports = async (req, res, next) => {
  const db = req.app.get('db')
  const { giver_id } = req.params
  console.log('giverId', giver_id)

  let [giverEmail] = await db.get_giver_rating_email([giver_id])

  // console.log('her', giverEmail)
  // console.log('req', req.session.user.email)
  // console.log('giv', giverEmail.email)

  if (req.session.user.email === giverEmail.email) {
    next()
  } else {
    res.status(403).send('You are not authorized to interact with this dono. Please navigate back to the home page')
  }
}
