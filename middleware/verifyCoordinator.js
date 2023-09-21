const validateCoordinatorToken = require('./validateCoordinatorToken')

const verifyAdmin = (req, res, next) => {
    validateCoordinatorToken(req, res, next, (err, val) => {
        if (err) {

            res.status(403).json({ "message": "You are not authorized!" });
        }
        else {
            (req.user)
            if (req.user.isCoordinator) {
                next();
            } else {
                console.log("You are not authorized!")
                res.status(403).json({ "message": "You are not authorized!" });
            }
        }
    })

};

module.exports = verifyAdmin;