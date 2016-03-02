var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	DisplayName:String,
	Email:{ type: String, required: true, unique: true },
	Password:String,
	EmailVerified:Boolean,
	CreatedAt:{type:Date, default:Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = User;