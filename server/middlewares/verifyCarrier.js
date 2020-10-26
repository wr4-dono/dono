module.exports = async (req, res, next) => {
  const db = req.app.get('db')
  const { carrier_id } = req.body

  let [carrierEmail] = await db.get_carrier_rating_email([carrier_id])

  if (req.session.user.email === carrierEmail.email) {
    next()
  } else {
    res.status(403).send('You are not authorized to interact with this dono. Please navigate back to the home page')
  }
}