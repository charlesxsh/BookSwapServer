var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	BookName:String,
	Author:String,
	Edition:Number,
	coverImg: {data:Schema.Types.Buffer, contentType:String}
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;