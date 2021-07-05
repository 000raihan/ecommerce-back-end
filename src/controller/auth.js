const User = require('../model/user');
const jwt = require('jsonwebtoken');


exports.singUp = (req, res, next) => {
    // console.log("im called");

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

exports.signin = (req, res, next) => {

    User.findOne({email: req.body.email})
        .exec((err, user) => {

            if (err) {
                res.status(400).json({message: err,user:user});
            }

            if (user) {

                if (user.authenticate(req.body.password)) {
                    
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id,email, firstName, lastName, userName, fullName, role } = user;
                    
                    res.status(200).json({
                        token: token, user: {
                            _id,
                            email,
                            firstName,
                            lastName,
                            userName,
                            fullName,
                            role
                    }})
                    

                } else {
                    res.status(400).json({message: "Password does not matched"})
                }
                
            } else {
                res.status(404).json({message: "User not found"})
            }
        })
}