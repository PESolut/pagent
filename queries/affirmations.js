
const getAllAffirmations = async () => {
    try {
        const allAffirmations = await db.any('SELECT * FROM affirmations')
        return allAffirmations
    } catch (error) {
        return error
    }
}

const getOneAffirmation = async (id) => {
    try {
        const oneAffirmation = await db.one('SELECT * FROM affirmations WHERE id=$1', id)
        return oneAffirmation
    } catch (error) {
        return error
    }
}

const db = require("../db/dbConfig");

const createAffirmation = async (affirmation) => {
  try {
    const newAffirmation = await db.one(
      `
      INSERT INTO affirmations 
      (event_type, source_db, payload, status, meta) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
      `,
      [
        affirmation.event_type,
        affirmation.source_db,
        affirmation.payload,
        affirmation.status || 'pending',
        affirmation.meta || {}
      ]
    );
    return newAffirmation;
  } catch (error) {
    console.error("createAffirmation error:", error);
    return error;
  }
};

const updateAffirmation = async (affirmation, id) => {
    try {
      const updatedAffirmation = await db.one(
        "UPDATE affirmations SET event_type=$1, source_db=$2, payload=$3, status=$4 meta=$5 WHERE id=$6 RETURNING *",
        [
          affirmation.event_type,
          affirmation.source_db,
          affirmation.payload,
          affirmation.status,
          affirmation.meta,
          id
        ]
      );
      return updatedAffirmation;
    } catch (error) {
      return error;
    }
  };

  const deleteAffirmation = async (id) => {
    try {
      const deletedAffirmation = await db.one(
        "DELETE FROM affirmations WHERE id=$1 RETURNING *",
        id
      );
      return deletedAffirmation;
    } catch (error) {
      return error;
    }
  };




module.exports = {
    getAllAffirmations,
    getOneAffirmation,
    createAffirmation,
    updateAffirmation,
    deleteAffirmation
  };