const express = require("express")
const affirmation = express.Router()
const { getAllAffirmations, getOneAffirmation, createAffirmation, updateAffirmation, deleteAffirmation } = require('../queries/affirmations.js')

affirmation.get('/', async (req, res) => {
    const allAffirmations = await getAllAffirmations()
    if(allAffirmations.length){
        res.status(200).json(allAffirmations)
    } else {
        res.status(500).json({Error: 'error while fetching data'})
    }
})

affirmation.get('/:id', async (req, res) => {
    const { id } = req.params
    const oneAffirmation = await getOneAffirmation(id)

    if(!oneAffirmation.message){
        res.status(200).json(oneAffirmation)
    } else {
        res.redirect('/not-found')
    }
})

affirmation.post("/", async (req, res) => {
    const newAffirmation = await createAffirmation(req.body)

    if(!newAffirmation.message){
        res.status(200).json(newAffirmation)
    }
    else {
        res.status(500).json({error: newAffirmation.message})
    }
})

affirmation.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedAffirmation = await updateaffirmation(req.body, id)

    if(!updatedAffirmation.message){
        res.status(200).json(updatedAffirmation)
    }
    else {
        res.status(500).json({error: updatedAffirmation.message})
    }
})

affirmation.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedAffirmation = await deleteAffirmation(id)

    if(!deletedAffirmation.message){
        res.status(200).json(deletedAffirmation)
    }
    else{
        res.status(500).json({error: deletedAffirmation.message})
    }
})

module.exports = affirmation