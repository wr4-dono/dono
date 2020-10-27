const nodemailer = require('nodemailer')
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

    let [carrierRating] = await db.get_average_carrier_rating([user_id])

    res.status(200).send(carrierRating)

  },

  getUserAverageGiverRating: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params

    let [giverRating] = await db.get_average_giver_rating([user_id])

    res.status(200).send(giverRating)
  },

  giverEmail: async (req, res) => {
    const { EMAIL_ACCOUNT, EMAIL_PASS } = process.env
    const db = req.app.get('db')
    const { rating, comment, giver_id } = req.body
    let [giverEmail] = await db.get_giver_rating_email([giver_id])
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASS
      }
    })

    let notification = {
      from: EMAIL_ACCOUNT,
      to: giverEmail.email,
      subject: 'A dono user rated your recent interaction',
      html:
        `<div style='font-family: Gill Sans, sans-serif; color: black; font-size: 18px;'>
      <h1 style ='font-size: 20px' >Hi, </h1>
      <div><p>Someone has rated how their experience went with you.</p></div>
      <div><p>Rating:${' '}${rating}/5</p></div>
      <div><p>Comment:${' '}${comment}</p></div>
      <div><p>The dono. Team</p></div>
    </div>`
    }

    transporter.sendMail(notification, (err, info) => {
      console.log(notification)
      if (err) {
        console.log(err);
      } else {
        console.log('Notification sent');
      }
    })

    res.sendStatus(201);
  },

  carrierEmail: async (req, res) => {
    const { EMAIL_ACCOUNT, EMAIL_PASS } = process.env
    const db = req.app.get('db')
    const { rating, comment, carrier_id } = req.body
    let [carrierEmail] = await db.get_carrier_rating_email([carrier_id])
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASS
      }
    })

    let notification = {
      from: EMAIL_ACCOUNT,
      to: carrierEmail.email,
      subject: 'A dono user rated your recent interaction',
      html:
        `<div style='font-family: Gill Sans, sans-serif; color: black; font-size: 18px;'>
        <h1 style ='font-size: 20px' >Hi, </h1>
        <div><p>Someone has rated how their experience went with you.</p></div>
        <div><p>Rating:${' '}${rating}/5</p></div>
      <div><p>Comment:${' '}${comment}</p></div>
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
