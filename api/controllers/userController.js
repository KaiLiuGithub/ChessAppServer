'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chess = mongoose.model('Chess');

const HandlerGenerator = require('../jwt/handlerGenerator');
const handler = new HandlerGenerator();

exports.login = function(req, res) {
    handler.login(req, res);
}

exports.createUser = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.find({ username: user.username }, function(err, docs) {
        if (!docs.length) {
            user.password = user.hashPassword(user.password)
            user.save(function(err) {
                if (err) throw err;
                console.log('User ' + user.username + ' saved to db')
            });

            res.status(200).json({
                _id: user._id,
                username: user.username
            });
        } else {
            console.log('ERR: User ' + user.username + ' already exists!');
            res.status(303).json({
                success: false,
                message: 'User ' + user.username + ' already exists!'
            });
        }
    });
}

exports.deleteUser = function(req, res) {
    User.deleteOne({ username: req.body.username }, function(err, obj) {
        if (err) throw err;
        
        Chess.deleteMany({ username: req.body.username }, function(err, obj) {
            if (err) throw err;
            console.log("User " + req.body.username + " deleted");
            res.status(200).json({
                success: true,
                message: 'User ' + req.body.username + ' deleted!'
            });
        });
    });
}
