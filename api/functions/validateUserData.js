const bcrypt = require('bcryptjs')

module.exports = function (req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.email && req.body.password) {
            req.validInput = {
                ...req.body
            }
            req.validInput.password = bcrypt.hashSync(req.validInput.password, 10)
            next()
        } else {
            res.status(422).json({
                errorMessage: 'Missing required input field. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing context data.'
        })
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)
        )
            return false
    }
    return true
}