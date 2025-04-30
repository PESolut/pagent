const db = require("../db/dbConfig.js");

const getAllAffirmations = async () => {
    try {
        const allAffirmations = await db.any('SELECT * FROM affirmations')
        return allAffirmations
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllAffirmations,
  };