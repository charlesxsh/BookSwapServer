var mongoose = require('mongoose');
var server = require('express')();
var bodyParser = require('body-parser')
var db = mongoose.connection
var Schema = mongoose.Schema;

server.use(bodyParser.json())
mongoose.connect("mongodb:// :27017/test");

server.post('/create/user', function(req, res){
    console.log(req.body);
});

server.post('/create/book', function(req, res){
    console.log(req.body);
});



db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', function(){
   console.log('db connection success') 
});

var userSchema = new Schema({
	DisplayName:String,
	Email:String,
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

function addUser(displayName, email, password){
	var newUser = new User({DisplayName:displayName, 
							Email:email,
							Password:password,
							EmailVerified:false
							});
	newUser.save(function(err, savedUser){
		if(err) console.log(err);
		
	});

}

function addBook(){

}

function addBookToRequest(){
    
}