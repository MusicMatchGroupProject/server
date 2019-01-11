const { User } = require('../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { hashPass, comparePass } = require('../helpers');
const {OAuth2Client} = require('google-auth-library');
require('dotenv').config();

class UserCon {
    static register(req, res, next) {
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

    static googleLogin(req, res, next) {
        const client = new OAuth2Client('538354353006-m1asnrg9t3e0vp3j1tk30chuknv12dv7.apps.googleusercontent.com');
        var payload = {}
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: '538354353006-m1asnrg9t3e0vp3j1tk30chuknv12dv7.apps.googleusercontent.com'
        })
        .then(function(ticket) {
            payload = ticket.getPayload()
            return User.findOne({email: payload.email})
        })
        .then(user => {
            if (!user) {
                User.create({
                    email: payload.email
                })
                .then(newUser => {
                    var token = jwt.sign({
                        email: newUser.email
                    }, process.env.JWT_SECRET)
                    res.status(200).json({
                        token: token
                    })
                })
                .catch(function(error) {
                    res.status(500).json({
                        msg: 'internal server error',
                        error: error
                    })
                })
            } else {
                var token = jwt.sign({
                    email: payload.email
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    token: token
                })
            }
        })
    }
};

module.exports = UserCon;