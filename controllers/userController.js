const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).send({
            message: "Email or password or username can not be empty",
        });
    }
    //   check user alerady exist or not
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (data) {
                return res.status(400).send({

                    message: "User already exist",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user.",
            });
        });



    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    });

    user
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user.",
            });
        });
};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: "Email or password can not be empty",
        });
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).send({
            message: "User does not exist",
        });
    }
    
    if (user && await bcrypt.compare(password, user.password)) {
        var token = jwt.sign({
            id: user._id,
            email: user.email,
            username: user.username,

        }, process.env.SECRET_KEY, {
            expiresIn: 86400, // expires in 24 hours
        });

        user.password = undefined;

        res.status(200).json({
            message: "Login Successful",
            user: user,
            token: token,


        });
    } else {
        res.status(401).json({
            message: "Invalid Credentials",
        });

    }
};

exports.loginR = (req, res) => {
    res.status(200).json({
        message: "Route is Working",
    });
};
