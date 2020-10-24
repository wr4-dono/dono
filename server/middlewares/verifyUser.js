module.exports = (req, res, next) => {
  console.log(req.session.user)
  console.log(req.params)
  if (req.session.user.user_id === +req.params.user_id) {
    next()
  } else {
    res.status(403).send(`You are not authorized to view this users' pending donos`)
  }
}