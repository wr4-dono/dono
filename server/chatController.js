module.exports = {
  initializeChat: async (req, res) => {
    const db = req.app.get('db');
    const { dono_id } = req.params
    const { giver_id, carrier_id } = req.body

    const [chat_id] = await db.initialize_chat(dono_id, giver_id, carrier_id);

    res.status(200).send(chat_id)
  },

  sendMessage: async (req, res) => {
    const db = req.app.get('db');
    const { chat_id, user_id } = req.params
    const { message } = req.body

    await db.send_message(chat_id, user_id, message);
    res.sendStatus(200);
  },

  getMessages: async (req, res) => {
    const db = req.app.get('db')
    const { chat_id } = req.params

    const allMessages = await db.get_messages(chat_id)
    res.status(200).send(allMessages)
  },

  getChatId: async (req, res) => {
    const db = req.app.get('db')
    const { dono_id } = req.params

    const [chat_id] = await db.get_chat_id(dono_id)

    res.status(200).send(chat_id)
  }
}