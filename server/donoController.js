const axios = require('axios')
const nodemailer = require('nodemailer')
const { ZIPCODE_API_KEY } = process.env


module.exports = {
  getAllDonos: async (req, res) => {
    const db = req.app.get('db');
    const { status, state, zip_code, radius, search } = req.query

    //Checks to see if radius is above 0
    if (radius < 0) {
      return res.sendStatus(416);
    }

    if (!radius && !search) {
      console.log('hit 1')
      const allDonos = await db.get_all_donos([status, state])
      console.log(allDonos)
      return res.status(200).send(allDonos)
    } else if (radius && !search) {
      console.log('hit 2')
      let zipcodes = await axios.get(`https://www.zipcodeapi.com/rest/${ZIPCODE_API_KEY}/radius.json/${zip_code}/${radius}/miles`)

      let newZipcodes = zipcodes.data.zip_codes.map(el => {
        return el.zip_code
      })

      // let filteredDonos = await db.donos.find({ dono_status: status, zip_code: newZipcodes })

      const params = []
      for (let i = 1; i <= newZipcodes.length; i++) {
        params.push('$' + i)
      }
      var queryText = 'SELECT * FROM donos d LEFT JOIN pictures p ON p.dono_id = d.dono_id WHERE d.dono_status = 1 AND d.zip_code IN (' + params.join(',') + ') ORDER BY d.created_at DESC;';
      let filteredDonos = await db.query(queryText, newZipcodes);

      return res.status(200).send(filteredDonos)
    } else if (!radius && search) {
      console.log('hit 3')

      const searchedDonos = await db.search_donos([status, search, state])

      return res.status(200).send(searchedDonos);
    } else {
      console.log('hit 4')
      let zipcodes = await axios.get(`https://www.zipcodeapi.com/rest/${ZIPCODE_API_KEY}/radius.json/${zip_code}/${radius}/miles`)

      let newZipcodes = zipcodes.data.zip_codes.map(el => {
        return el.zip_code
      })

      const params = []
      for (let i = 1; i <= newZipcodes.length; i++) {
        params.push('$' + i)
      }
      var queryText = 'SELECT * FROM donos d LEFT JOIN pictures p ON p.dono_id = d.dono_id WHERE d.dono_status = 1 AND d.zip_code IN (' + params.join(',') + ') ORDER BY d.created_at DESC;';
      let filteredDonos = await db.query(queryText, newZipcodes);

      let arrayOfDonosWithTitle = []
      // console.log(filteredDonos)
      for (let i = 0; i < filteredDonos.length; i++) {
        if (filteredDonos[i].title === search) {
          arrayOfDonosWithTitle.push(filteredDonos[i])
        }
      }

      return res.status(200).send(arrayOfDonosWithTitle)
    }
  },

  getDono: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params

    const [dono] = await db.get_dono(dono_id)

    res.status(200).send(dono);
  },

  acceptDono: async (req, res) => {
    const db = req.app.get('db');
    const { user_id, dono_id } = req.params

    console.log(user_id, dono_id)
    const acceptedDono = await db.accept_dono(user_id, dono_id);
    console.log(acceptedDono)
    res.status(200).send(acceptedDono);

  },

  createDono: async (req, res) => {
    const db = req.app.get('db');

    const { giver_id, zip_code, dono_state, title, description, price, multiplePeople, truckTrailer } = req.body;
    const [dono_id] = await db.create_dono([giver_id, zip_code, dono_state, title, description, price, multiplePeople, truckTrailer]);

    res.status(200).send(dono_id);
  },

  savePictureURL: async (req, res) => {
    const db = req.app.get('db')

    const { dono_id, url } = req.body
    await db.save_picture_url([dono_id, url])

    res.sendStatus(200)
  },

  editDono: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params;
    const { zip_code, dono_state, title, description, price, multiplePeople, truckTrailer, url } = req.body;

    const updatedDono = await db.edit_dono(dono_id, zip_code, dono_state, title, description, price, multiplePeople, truckTrailer);
    await db.edit_dono_picture(dono_id, url);
    res.status(200).send(updatedDono);
  },

  //* Use this code below to change the status from 1 to 2 or 2 to 3
  updateDonoStatus: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params;
    const { status } = req.query;

    await db.update_dono_status(dono_id, status);

    res.sendStatus(200);
  },

  deleteDono: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params;
    await db.delete_dono(dono_id);
    res.sendStatus(200);
  },

  acceptedEmail: async (req, res) => {
    const { EMAIL_ACCOUNT, EMAIL_PASS } = process.env
    const db = req.app.get('db')
    const { giver_id } = req.body
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
      subject: 'Someone has accepted your dono',
      html:
        `<div style='font-family: Gill Sans, sans-serif; color: black; font-size: 18px;'>
        <h1 style ='font-size: 20px' >Hi, </h1>
        <div><p>Someone has accepted your dono:</p></div>
        <div><p>Please login to contact the carrier</p></div>
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
  },

  getPendingDonos: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;
    const pendingDonos = await db.get_pending_donos(user_id)
    res.status(200).send(pendingDonos)
  }
}
