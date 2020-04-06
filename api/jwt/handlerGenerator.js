const express = require('express');
const mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../../config');
let middleware = require('../../middleware');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

class HandlerGenerator {
    login (req, res) {
        User.findOne({ username: req.body.username }, function(err, user) {
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if (err) {
                    throw err 
                } else if (isMatch) {
                    let token = jwt.sign({ username: req.body.username },
                                config.secret,
                                { expiresIn: '24h' });
                
                    res.status(200).json({
                        success: true,
                        message: 'Authentication successful',
                        token: token
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'Password does not match!',
                        token: token   
                    });
                }
            });
        });
    }     
   
    index (req, res) {
        res.json({
            success: true,
            message: 'Index page'
        })
    }
}

module.exports = HandlerGenerator
