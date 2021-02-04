const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, { _id: 1 })
        .then((user) => {
            if (user) {
                const error = new Error("User Already Exist");
                error.statusCode = 401;
                throw error;
            }
            return bcrypt.hash(password, 10);
        })

        .then((hashPassword) => {
            const newUser = new User({
                email: email,
                password: hashPassword,
            });
            return newUser.save();
        })
        .then((newUser) => {
            const token = jwt.sign(
                {
                    userId: newUser._id,
                },
                process.env.JWT_SECRET,
            );
            res.status(201).json({
                message: "User Created",
                token: token,
                user: {
                    email: newUser.email,
                    id: newUser._id,
                },
            });
        })
        .catch((err) => {
            if (!err) {
                err.statusCode(500);
                next(err);
            }
            next(err);
        });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser = null;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                const error = new Error("User Doesn't Exist");
                error.statusCode = 404;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                const error = new Error("Password not match");
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    userId: loadedUser._id,
                },
                process.env.JWT_SECRET,
            );

            return res.status(200).json({
                message: "User found",
                token: token,
                user: {
                    email: loadedUser.email,
                    id: loadedUser._id,
                },
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
            next(err);
        });
};
