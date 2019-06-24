const Users = require('../models/usersModel.js')
const bcrypt = require('bcryptjs')
const tokenService = require('./tokenService.js')

module.exports = async function validateUser(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await Users.findBy({ email })
        .first()
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = tokenService(user)
            req.validUser = {
                email: user.email,
                id: user.id,
                token: token
            }
            next()
        } else {
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}