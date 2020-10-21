module.exports = {
  giverRatesCarrier: async (req, res) => {
    const db = req.app.get('db')
    const { dono_id } = req.params // not totally sure we need this since they connect on the dono table. if we need to show them both the specific rating, we can connect them via donos table.
    const { rating, comment } = req.body

    await db.giver_rates_carrier([dono_id, rating, comment])

    res.status(200).send('rating submitted')

  },

  carrierRatesGiver: async (req, res) => {
    const db = req.app.get('db')
    const { dono_id } = req.params
    const { rating, comment } = req.body

    await db.carrier_rates_giver([dono_id, rating, comment])

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
  },

  ratingTest: async (req, res) => {
    let transporter = nodemailer.createTransport({  
      service: 'gmail',
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASS
      }
    })

    let notification = {
      from: EMAIL_ACCOUNT,
      to: 'nickamantia@gmail.com',
      subject: 'Someone has accepted your dono',
      html: 
      `<div style='font-family: Gill Sans, sans-serif; color: black; font-size: 18px;'>
        <h1 style ='font-size: 20px' >Hi, </h1>
        <div><p>Someone has rated how thier experience went with you.</p></div>
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
    }
  }
  // NOT MVP
  // getAllUserRatings: async (req, res) => {}
