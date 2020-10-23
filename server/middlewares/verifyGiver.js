module.exports = async (req, res, next) => {
  const db = req.app.get('db')
  const { giver_id } = req.body
  console.log(giver_id)
  let [giverEmail] = await db.get_giver_rating_email([giver_id])
  console.log(giverEmail)
  if (req.session.user.email === giverEmail.email) {
    next()
  } else {
    res.status(403).send('You are not connected to this dono, please navigate back to the home screen')
  }
}
