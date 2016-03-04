var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	DisplayName:String,
	Email:{ type: String, required: true, unique: true },
	Password:String,
	EmailVerified:Boolean,
	CreatedAt:{type:Date, default:Date.now}
});

userSchema.statics.signUp = function(displayName, email, password, callback){
    this.count({Email: email}, function (err, count) {
    if (!count) { //if no duplication
        console.log("Inserting " + email);
        var newUser = new User({
            DisplayName:displayName, 
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

userSchema.statics.signIn = function(email, password, callback){
    this.findOne({Email:email}, function(err, user){
        if(!user) { //not found email
            callback({status:"Not found email"});
        } else{ //found email, check password
            if(user.Password == password){
                callback({status:"OK", displayname:user.DisplayName, id:user.id});
            }else{
                callback({status:"Incorrect password"});
            }
        }
    });
}



var User = mongoose.model('User', userSchema);
module.exports = User;