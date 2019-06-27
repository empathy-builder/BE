const express = require('express')
const Data = require('../models/dataModel.js')

const router = express.Router()
const restrictedMiddleware = require('../functions/restrictedMiddleware.js')

router.get('/data', restrictedMiddleware, async (req, res) => {
    try {
        const data = await Data.getAll()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/data/search', restrictedMiddleware, async (req, res) => {
    const { column, filter } = req.body
    try {
        const data = await Data.findBy(column, filter)
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/insert', async (req, res) => {
    const newData = req.body
    try {
        await Data.insert(newData)
        res.status(200).json({
            message: 'data entered into DB'
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router