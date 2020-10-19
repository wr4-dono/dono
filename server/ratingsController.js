module.exports = {
  giverRatesCarrier: async (req, res) => {
    const db = req.app.get('db')
    const { dono_id } = req.params // not totally sure we need this since they connect on the dono table. if we need to show them both the specific rating, we can connect them via donos table.
    const { rating, comment } = req.body

    let result = await db.giver_rates_carrier([dono_id, rating, comment])

    res.status(200).send('rating submitted')

  },

  carrierRatesGiver: async (req, res) => {
    const db = req.app.get('db')
    const { dono_id } = req.params
    const { rating, comment } = req.body

    let result = await db.carrier_rates_giver([dono_id, rating, comment])

    res.status(200).send('rating submitted')
  },

  getUserAverageCarrierRating: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params

    let carrierRating = await db.get_average_carrier_rating([user_id])

    res.status(200).send(carrierRating)

  },

  getUserAverageGiverRating: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params

    let giverRating = await db.get_average_giver_rating([user_id])

    res.status(200).send(giverRating)
  }
  // NOT MVP
  // getAllUserRatings: async (req, res) => {}
}