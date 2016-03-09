var express = require('express');        // call express
var User = require('../MongoDBModel/UserModel');
var OnList = require('../MongoDBModel/OnlistModel');
var RequestList = require('../MongoDBModel/RequestlistModel');

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
    User.signUp(req.body.profie, req.body.displayname, req.body.email, req.body.password, function(result){
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

router.route('/requestlist/add').post(function(req, res){
     console.log("[/requestlist/add]");
     console.log(req.body);
     RequestList.addRequestList(
         req.body.bookname,
         req.body.authorname,
         req.body.edition,
         req.body.belongto, 
         function(result){
            res.json(result);  
         }
     );
});
router.route('/search/onlist').post(function(req, res){
    console.log("[/search/onlist]");
    console.log(req.body);
    OnList.searchItem(req.body.search, function(result){
        res.json(result);
    });
});


router.route('/search/request').post(function(req, res){
    console.log("[/search/request]");
    console.log(req.body);
    RequestList.searchItem(req.body.search, function(result){
        res.json(result);
    });
});

module.exports = router;

