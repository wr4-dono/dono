module.exports = {
  getAllFavorites: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    let [favorites] = await db.get_all_favorites([user_id])
    console.log(favorites)
    res.status(200).send(favorites)
  },

  favoriteDono: async (req, res) => {
    const db = req.app.get('db')

    const { dono_id, user_id } = req.params

    let result = await db.favorite_dono([user_id, dono_id])

    res.status(200).send(result)
  },

  unfavoriteDono: async (req, res) => {
    const db = req.app.get('db')

    const { favorites_id, user_id } = req.params

    let result = await db.unfavorite_dono([user_id, favorites_id])

    res.status(200).send(result)
  }
}
