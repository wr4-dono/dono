module.exports = {
  getAllDonos: async (req, res) => {
    const db = req.app.get('db');

    const { status } = req.query

    const allDonos = await db.getAllDonos(status)

    res.status(200).send(allDonos)

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

    const { giver_id, zip_code, title, description, price, multiplePeople, truckTrailer } = req.body;
    const [dono_id] = await db.createDono([giver_id, zip_code, title, description, price, multiplePeople, truckTrailer]);


    res.status(200).send(dono_id);
  },

  savePictureURL: async (req, res) => {
    const db = req.app.get('db')

    const { dono_id, url } = req.body
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
  }
}
