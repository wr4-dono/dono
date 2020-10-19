module.exports = async (db) => {

    const favorites = await db.get_all_favorites(db)

    return favorites
    
}