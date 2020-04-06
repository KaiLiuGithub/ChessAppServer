'use strict';
let middleware = require('../../middleware');

module.exports = function(app) {
    var controller = require('../controllers/index');

    app.route('/signup')
        .post(controller.user.createUser);

    app.route('/login')
        .post(controller.user.login);

    app.route('/delete')
        .delete(controller.user.deleteUser);

    app.route('/chess/:username')
        .get(middleware.checkToken, controller.chess.readGame)
        .put(middleware.checkToken, controller.chess.updateGame)
        .post(middleware.checkToken, controller.chess.createGame)
        .delete(middleware.checkToken, controller.chess.deleteGame)
}
