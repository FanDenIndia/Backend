const validateAdminToken = require('./validateAdminToken')

const verifyAdmin = (req, res, next) => {
    console.log("VERIFY ADMIN")
    validateAdminToken(req, res, next, (err, val) => {
        if (err) {

            res.status(403).json({ "message": "You are not authorized!" });
        }
        else {
            console.log(req.user)
            if (req.user.isAdmin) {
                next();
            } else {
                console.log("You are not authorized!")
                res.status(403).json({ "message": "You are not authorized!" });
            }
        }
    })

};

module.exports = verifyAdmin;