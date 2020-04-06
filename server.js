const express = require('express');
const app = express();
const port = 8080;

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Chessdb', { useNewUrlParser: true });

var model = require('./api/models/index');

var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('mongodb connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./api/routes/chessRoutes');
routes(app);

app.listen(port, '0.0.0.0', function() {
    console.log('Listening to port: ' + port);
});


app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});
