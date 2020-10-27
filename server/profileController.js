module.exports = {
    editInfo: async (req, res) => {
        const db = req.app.get('db')
        const { username, user_state, zip_code, email } = req.body

        //pulls if for user from session
        const { user_id } = req.session.user

        const [updateProfile] = await db.edit_profile([user_id, username, user_state, zip_code, email])
        res.status(200).send(updateProfile)
    }
}