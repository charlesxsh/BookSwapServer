var mongoose = require('mongoose');
var express    = require('express');        // call express
var app        = express();  
var bodyParser = require('body-parser')
var db = mongoose.connection
var Schema = mongoose.Schema;
var router = express.Router();  

var User = require('./src/MongoDBModel/UserModel');
var OnList = require('./src/MongoDBModel/OnlistModel');
var RequestList = require('./src/MongoDBModel/RequestlistModel');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
mongoose.connect("mongodb://127.0.0.1:27017/test");
app.listen(8080);

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/users/signup').post(function(req, res) {
    console.log("[/users/signup]:");
    console.log(req.body);
    console.log("DisplayName: %s", req.body.displayname);
    console.log("Email: %s", req.body.email);
    console.log("Password: %s", req.body.password);
    User.signUp(req.body.displayname, req.body.email, req.body.password, function(result){
        res.json(result);
    });
});

router.route('/users/signin').post(function(req, res){
    console.log("[/users/signin]"+req.body);
    console.log("Email: %s", req.body.email);
    console.log("Password: %s", req.body.password);
    User.signIn(req.body.email, req.body.password, function(result){
        res.json(result);
    });
});

router.route('/onlist/search').post(function(req, res){
    OnList.searchItem(req.body.search, function(result){
        res.json(result);
    });
});

app.use('/api', router);


db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', function(){
   console.log('db connection success') 
});
