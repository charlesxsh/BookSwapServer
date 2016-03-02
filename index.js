var mongoose = require('mongoose');
var express    = require('express');        // call express
var app        = express();  
var bodyParser = require('body-parser')
var db = mongoose.connection
var Schema = mongoose.Schema;
var router = express.Router();  

var User = require('./src/MongoDBModel/UserModel.js');
var Book = require('./src/MongoDBModel/BookModel.js');
var OnList = require('./src/MongoDBModel/OnlistModel.js');
var RequestList = require('./src/MongoDBModel/RequestlistModel.js');


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
    console.log(req.body);
    console.log("DisplayName: %s", req.body.displayname);
    console.log("Email: %s", req.body.email);
    console.log("Password: %s", req.body.password);
    addUser(req.body.displayname, req.body.email, req.body.password, function(result){
        console.log(JSON.stringify(result));
    });
});

app.use('/api', router);


db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', function(){
   console.log('db connection success') 
});

/**
 * callback(result)
 */
function addUser(displayName, email, password, callback){
    User.count({Email: email}, function (err, count) {
    if (!count) { //if no duplication
        console.log("Inserting " + email);
        var newUser = new User({DisplayName:displayName, 
                            Email:email,
                            Password:password,
                            EmailVerified:false
                            });
        newUser.save(function(err, user){
            //error when saving
            if(err) {
                callback({status:err});
            }else //if no error, return object id
            {
                callback({status:"OK", id:user.id});
            }
        });
    }
    else { //if duplication
        console.log('[user/signup]:Email address existed');
        callback({status: "Email address existed."});
    }
    });
}



function addBook(){

}

function addBookToRequest(){
    
}