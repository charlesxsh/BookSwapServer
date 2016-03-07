var express    = require('express');        // call express
var User = require('./src/MongoDBModel/UserModel');
var OnList = require('./src/MongoDBModel/OnlistModel');
var RequestList = require('./src/MongoDBModel/RequestlistModel');

//create new router
var router = express.Router();  

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

router.route('/search/onlist').post(function(req, res){
    OnList.searchItem(req.body.search, function(result){
        res.json(result);
    });
});

router.route('/search/request').post(function(req, res){
    RequestList.searchItem(req.body.search, function(result){
        res.json(result);
    });
});

module.exports = router;

