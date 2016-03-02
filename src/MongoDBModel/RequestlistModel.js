var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestlistSchema = new Schema({
	Book:Schema.Types.ObjectId,
	BelongTo:Schema.Types.ObjectId
});

var RequestList = mongoose.model('RequestList', requestlistSchema);

module.exports = RequestList;