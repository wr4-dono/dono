const axios = require('axios')
const nodemailer = require('nodemailer')
const { EMAIL_ACCOUNT, EMAIL_PASS, ZIPCODE_API_KEY } = process.env



module.exports = {
  getAllDonos: async (req, res) => {

    const db = req.app.get('db');

    const { status, zip_code, radius = null } = req.query
    if (!radius) {
      const allDonos = await db.getAllDonos(status)
      res.status(200).send(allDonos)
    } else {
      let zipcodes = await axios.get(`https://www.zipcodeapi.com/rest/${ZIPCODE_API_KEY}/radius.json/${zip_code}/${radius}/mile`)

      let newZipcodes = zipcodes.data.zip_codes.map(el => {
        return +el.zip_code
      })

      let filteredDonos = await db.donos.find({ dono_status: status, zip_code: newZipcodes })

      res.status(200).send(filteredDonos)
    }
  },

  getDono: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params

    const dono = await db.getDono(dono_id)

    res.status(200).send(dono);
  },

  acceptDono: async (req, res) => {
    const db = req.app.get('db');
    const { user_id, dono_id } = req.params

    const acceptedDono = await db.acceptDono(user_id, dono_id);
    res.status(200).send(acceptedDono);


  },

  createDono: async (req, res) => {
    //! STILL NEED TO IMPLEMENT PICTURES
    const db = req.app.get('db');

    const { user_id, zip_code, title, description, price, multiplePeople, truckTrailer } = req.body;
    await db.createDono(user_id, zip_code, title, description, price, multiplePeople, truckTrailer);

    res.sendStatus(200);
  },

  savePictureURL: async (req, res) => {
    const db = req.app.get('db')

    const { url, dono_id } = req.body
    await db.save_picture_url([dono_id, url])

    res.sendStatus(200)
  },

  editDono: async (req, res) => {
    //! STILL NEED TO IMPLEMENT PICTURES
    const db = req.app.get('db');
    const { dono_id } = req.params;
    const { zip_code, title, description, price, multiplePeople, truckTrailer } = req.body;

    const updatedDono = await db.editDono(dono_id, zip_code, title, description, price, multiplePeople, truckTrailer);

    res.status(200).send(updatedDono);
  },

  //* Use this code below to change the status from 1 to 2 or 2 to 3
  updateDonoStatus: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params;
    const { status } = req.query;

    await db.updateDonoStatus(dono_id, status);

    res.sendStatus(200);
  },

  deleteDono: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params;
    await db.deleteDono(dono_id);
    res.sendStatus(200);
  },

  acceptTest: async (req, res) => {


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
  }
}
