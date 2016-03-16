var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    profie:{type:Buffer, get:function(profie) {
        return profie.toString('base64');
    }},
	displayName:String,
	email:{ type: String, required: true, unique: true },
	password:String,
	emailVerified:Boolean,
	createdAt:{type:Date, default:Date.now}
});

userSchema.set('toJSON', { getters: true});

userSchema.statics.signUp = function(profie,displayName, email, password, callback){
    this.count({Email: email}, function (err, count) {
    if (!count) { //if no duplication
        console.log("Inserting " + email);
        var newUser = new User({
            profie:new Buffer(profie,'base64'),
            displayName:displayName, 
            email:email,
            password:password,
            emailVerified:false
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

userSchema.statics.signIn = function(targetEmail, password, callback){
    this.findOne({email:targetEmail},'displayName password profie',function(err, user){
        if(!user) { //not found emails
            callback({status:"Not found email"});
        } else{ //found email, check password
            if(user.password == password){
                callback({status:"OK", DisplayName:user.displayName, id:user.id, Profie:user.profie});
            }else{
                callback({status:"Incorrect password"});
            }
        }
    });
}



var User = mongoose.model('User', userSchema);
module.exports = User;