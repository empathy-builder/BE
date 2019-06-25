const Users = require('../models/usersModel.js')

module.exports = async function validateGame(req, res, next){
    const id = req.params.id
    try {
        const user = await Users.findById(id)
        if (user) {
            req.validUser = {
                id: user.id,
                email: user.email,
                password: Users.password
            }
            next()
        } else {
            res.status(404).json({
                message: "User not found."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}