var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onlistSchema = new Schema({
	Book:Schema.Types.ObjectId,
	SellPrice:Number,
	RentPrice:Number,
	BelongTo:Schema.Types.ObjectId,
	Swap:Boolean
});

var OnList = mongoose.model('OnList', onlistSchema);

module.exports = OnList;