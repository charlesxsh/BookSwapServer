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
    console.log("DisplayName: %s", req.body.displayName);
    console.log("Email: %s", req.body.email);
    console.log("Password: %s", req.body.password);
    console.log(req.body.profie);
    User.signUp(req.body.profie, req.body.displayName, req.body.email, req.body.password, function(result){
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
         req.body.bookName,
         req.body.authorName,
         req.body.edition,
         req.body.belongTo, 
         function(result){
            res.json(result);  
         }
     );
     
});

router.route('/OnList/add').post(function(req, res){
    console.log("[/OnList/add]");
    OnList.addItem(
        req.body.bookName, req.body.authorName, req.body.edition, 
        req.body.sellPrice, req.body.rentPrice,
        req.body.belongTo, req.body.swap,
        function(result){
            res.json(result);
        }
    );
});

router.route('/OnList/Image/add').post(function(req, res){
    console.log("[/OnList/Image/add");
    OnList.addImageTo(req.body.id, req.body.img,
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
router.route('/OnList/query').post(function(req, res){
    console.log("[/OnList/query]");
    OnList.searchItem(req.body, function(result){
        res.json(result);
    });
});


router.route('/RequestList/query').post(function(req, res){
    console.log("[/RequestList/query]");
    console.log(req.body);
    RequestList.searchItem(req.body, function(result){
        res.json(result);
    });
});

module.exports = router;

