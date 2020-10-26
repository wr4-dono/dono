module.exports = async (req, res, next) => {
  const db = req.app.get('db')
  const { giver_id } = req.body

  let [giverEmail] = await db.get_giver_rating_email([giver_id])

  if (req.session.user.email === giverEmail.email) {
    next()
  } else {
    res.status(403).send('You are not authorized to interact with this dono. Please navigate back to the home page')
  }
}
