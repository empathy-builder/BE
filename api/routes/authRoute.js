const express = require('express')
const Users = require('../models/usersModel.js')

const validateUserData = require('../functions/validateUserData.js')
const validateUser = require('../functions/validateUser.js')

const router = express.Router()

router.post('/register', validateUserData, async (req, res) => {
    const newUser = req.validInput
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

router.post('/login', validateUser, async (req, res) => {
    try {
        console.log(res.body)
        res.status(200).json({
            message: `Welcome ${req.validUser.email}`,
            user: req.validUser
        })
    } catch (error) {
        console.log("error")
        res.status(500).json({
            message: "Error"
        })
    }
})

module.exports = router