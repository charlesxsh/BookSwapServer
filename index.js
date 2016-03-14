var mongoose = require('mongoose');
var express    = require('express');        // call express
var app        = express();  
var bodyParser = require('body-parser')
var db = mongoose.connection
var Schema = mongoose.Schema;
var apiRouter = require('./src/Router/ApiRouter');

//http set up
app.use(bodyParser.json({limit: '13mb'}));
app.use(bodyParser.urlencoded({limit: '13mb', extended: true}));
app.listen(8080);

//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/test");

//router set up
app.use('/api', apiRouter);



db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', function(){
   console.log('db connection success') 
});
