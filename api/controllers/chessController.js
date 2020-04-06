'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chess = mongoose.model('Chess');

exports.createGame = function(req, res) {
    var chess = new Chess({
        username: req.decoded.username,
        turn: req.body.turn,
        game: req.body.game,
        board: req.body.board,
        white: req.body.white,
        black: req.body.black
    });

    User.exists({ username: req.decoded.username }, function(err, result) {
        if (result) {
            chess.save(function(err) {
                if (err) throw err;
                console.log('User ' + chess.username + ' chess data saved');
            });

            res.status(200).json(chess);
        } else {
            console.log('ERR: User ' + chess.username + ' does not  exist!');
            res.status(303).json({
                success: false,
                message: 'User ' + chess.username + ' does not exist!'
            });
        }
    });
}

exports.readGame = function(req, res) {
    Chess.findOne({ username: req.decoded.username, game: req.query.game },
        function(err, obj) {
        if (err) throw err;
        if (!obj.length) {
            console.log('User ' + req.decoded.username + ' ' + req.query.game + 
                        ' data returned.');
            res.status(200).send(obj);
        } else {
            res.status(404).json({
                success: false,
                message: 'User ' + req.decoded.username + ' has no data for '
                         + req.query.game
            });
        }            
    });
}

exports.updateGame = function(req, res) {
    Chess.updateOne({ username: req.decoded.username, game: req.body.game },
        { $set: {
            turn: req.body.turn,
            game: req.body.game,
            board: req.body.board,
            white: req.body.white,
            black: req.body.black
        }}, { new: true },  function(err, obj) {
        if (err) throw err;
        if (obj.length) {
            res.status(200).send(obj)
        } else {
            res.status(404).json({
                success: false,
                message: 'Game not found for User ' + req.decoded.username
            });
        }
    });
}

exports.deleteGame = function(req, res) {
    Chess.deleteOne({ username: req.decoded.username, game: req.body.game },
        function(err, obj) {
        if (err) throw err;
        console.log('User ' + req.body.username + ' chess data deleted');
        res.status(200).json({
            success: true,
            message: 'User ' + req.body.username + ' deleted!'
        });
    });
}
