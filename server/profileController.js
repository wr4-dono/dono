module.exports = {
    editInfo: async (req, res) => {
        const db = req.app.get('db')
        const{username, zip_code, email} = req.body

        //pulls if for user from thier session
        const {user_id} = req.session.user

        const [updateProfile] = await db.edit_profile([user_id, username, zip_code, email])
            res.status(200).send(updateProfile)

    }
}