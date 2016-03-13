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

router.route('/User/signup').post(function(req, res) {
    console.log("[/User/signup]:");
    console.log(req.body);
    console.log("DisplayName: %s", req.body.displayname);
    console.log("Email: %s", req.body.email);
    console.log("Password: %s", req.body.password);
    User.signUp(req.body.profie, req.body.displayname, req.body.email, req.body.password, function(result){
        res.json(result);
    });
});

router.route('/User/signin').post(function(req, res){
    console.log("[/User/signin]"+req.body);
    console.log("Email: %s", req.body.email);
    console.log("Password: %s", req.body.password);
    User.signIn(req.body.email, req.body.password, function(result){
        res.json(result);
    });
});

router.route('/RequestList/add').post(function(req, res){
     console.log("[/RequestList/add]");
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
    //  RequestList.addRequestList("bookname1", "author1",3,"56d88c8f4af53c557f539179", function(params){});
    //  RequestList.addRequestList("bookname2", "author2",3,"56d88c8f4af53c557f539179", function(params){});
    //  RequestList.addRequestList("bookname3", "author3",3,"56d88c8f4af53c557f539179", function(params){});
/**
 * query api format:/api/query/[document name]
 * 
 * query body: {a=b,c=d}
 * whole body is the query json 
 * a is key, b is value 
 * key should be one of the member in that document
 */
router.route('/query/OnList').post(function(req, res){
    console.log("[/query/OnList]");
    console.log(req.body);
    OnList.searchItem(req.body, function(result){
        res.json(result);
    });
});


router.route('/query/RequestList').post(function(req, res){
    console.log("[/query/RequestList]");
    console.log(req.body);
    RequestList.searchItem(req.body, function(result){
        res.json(result);
    });
});

module.exports = router;

