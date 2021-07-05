const User = require('../model/user');


exports.singUp = (req, res, next) => {
    console.log("im called");

    const { email, firstName, lastName, userName, password } = req.body;
    User.findOne(email)
        .exec((err, user) => {

            if (user) {
                res.status(406).json({ message: "this email already exist" })
            }

            const _user = new User({
                firstName,
                lastName,
                password,
                userName,
                email,
                password
            });

            _user.save((err, data) => {
                if (err) {
                    res.status(400).json({ message: "something wrond" })
                }
                if (data) {
                    res.status(201).json({ message: data })
                }
            })



        })
}