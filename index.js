var mongoose = require('mongoose');
var express    = require('express');        // call express
var app        = express();  
var bodyParser = require('body-parser')
var db = mongoose.connection
var Schema = mongoose.Schema;
var router = express.Router();  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
mongoose.connect("mongodb://127.0.0.1:27017/test");
app.listen(8080);

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/users').post(function(req, res) {
    console.log("Request to create new user");     
    console.log("DisplayName: %s", req.body.displayname);
    console.log("Email: %s", req.body.email);
    console.log("Password: %s", req.body.password);
    console.log(req.body);
});

app.use('/api', router);


db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', function(){
   console.log('db connection success') 
});

var userSchema = new Schema({
	DisplayName:String,
	Email:{ type: String, required: true, unique: true },
	Password:String,
	EmailVerified:Boolean,
	CreatedAt:{type:Date, default:Date.now}
});

var bookSchema = new Schema({
	BookName:String,
	Author:String,
	Edition:Number,
	coverImg: {data:Schema.Types.Buffer, contentType:String}
});

var onlistSchema = new Schema({
	Book:Schema.Types.ObjectId,
	SellPrice:Number,
	RentPrice:Number,
	BelongTo:Schema.Types.ObjectId,
	Swap:Boolean
});

var requestlistSchema = new Schema({
	Book:Schema.Types.ObjectId,
	BelongTo:Schema.Types.ObjectId
});

var User = mongoose.model('User', userSchema);
var Book = mongoose.model('Book', bookSchema);
var OnList = mongoose.model('OnList', onlistSchema);
var RequestList = mongoose.model('RequestList', requestlistSchema);

/**
 * callback(err, result)
 */
function addUser(displayName, email, password, callback){
    User.count({Email: email}, function (err, count) {
    if (!count) {
        console.log("Inserting " + email);
        var newUser = new User({DisplayName:displayName, 
                            Email:email,
                            Password:password,
                            EmailVerified:false
                            });
        newUser.save(function(err){
            callback(err, (!err)?true:false);
        });
    }
    else {
        console.log('Already Exists');
    }
    });
}


addUser("displayname1", "email@wpi.edu", "passwordtest", function(err, result)
{
    if(err){
        console.log(err);
        return;
    }
    if(result){
        console.log("Save successfully");
    }
    else{
        console.log("Save failed because of duplication");
    }
});

addUser("displayname1", "email@wpi.edu", "passwordtest", function(err, result)
{
    if(err){
        console.log(err);
        return;
    }
    if(result){
        console.log("Save successfully");
    }
    else{
        console.log("Save failed because of duplication");
    }
});

function addBook(){

}

function addBookToRequest(){
    
}