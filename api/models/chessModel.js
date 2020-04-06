'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var PieceSchema = new Schema({
    isWhite: { type: Boolean },
    isEmpty: { type: Boolean },
    hasMoved: { type: Boolean },
    rank: { type: Number },
    position: { type: Number },
    isPromoted: { type: Boolean },
    board: { type: String}, 
    unpromotedName: { type: Number },
    promotedName: { type: Number },
    unpromotedImg: { type: Number },
    promotedImg: { type: Number }
});

module.exports = mongoose.model('Piece', PieceSchema);

var ChessSchema = new Schema({
    username: { type: String, mandatory: true },
    turn: { type: Number },
    game: { type: String },
    board: [ PieceSchema ],
    white: [ PieceSchema ],
    black: [ PieceSchema ]
})
 
module.exports = mongoose.model('Chess', ChessSchema);
