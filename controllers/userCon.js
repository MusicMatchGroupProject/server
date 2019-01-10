const { User } = require('../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { hashPass, comparePass } = require('../helpers');
require('dotenv').config();

class UserCon {
    static singup(req, res, next) {
        let password = hashPass(req.body.password);
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: password
        })
        .then(user => {
            res.status(201).json({
                username: user.username,
                email: user.email
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'internal server error',
                error: error
            })
        })
    }

    static login(req, res, next) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePass(req.body.password, user.password)) {
                        let token = jwt.sign({
                            username: user.username,
                            email: user.email
                        }, process.env.JWT_SECRET);
                        res.status(200).json({
                            token: token
                        })
                    } else {
                        res.status(400).json({
                            msg: 'Wrong email / password'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'Wrong email / password'
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'internal server error',
                    error: error
                })
            })
    }

};

module.exports = UserCon;