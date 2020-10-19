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

    const { user_id, zip_code, title, description, price, multiplePeople, truckTrailer } = req.body;
    await db.createDono(user_id, zip_code, title, description, price, multiplePeople, truckTrailer);

    res.sendStatus(200);
  },

  editDono: async (req, res) => {
    //! STILL NEED TO IMPLEMENT PICTURES
    const db = req.app.get('db');
    const { dono_id } = req.params;
    const { zip_code, title, description, price, multiplePeople, truckTrailer } = req.body;

    const updatedDono = await db.editDono(dono_id, zip_code, title, description, price, multiplePeople, truckTrailer);

    res.status(200).send(updatedDono);
  },

  deleteDono: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params;
    await db.deleteDono(dono_id);
    res.sendStatus(200);
  }
}
