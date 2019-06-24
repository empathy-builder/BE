const express = require('express')
const Users = require('../models/usersModel.js')

const validateUserData = require('../functions/validateUserData.js')

const router = express.Router()

router.post('/register', validateUserData, async (req, res) => {
    const newUser = req.validInput
    console.log(newUser)
    try {
        const user = await Users.insert(newUser)
        res.status(201).json({
            user: {
                id: user.id,
                email: user.email
            }
        })
    } catch (error) {
        if(error.errno === 19) {
            res.status(405).json(error)
        } else {
            res.status(500).json(error)
        }
    }
})

module.exports = router