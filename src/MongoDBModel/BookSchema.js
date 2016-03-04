// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var bookSchema = new Schema({
// 	BookName:String,
// 	Author:String,
// 	Edition:Number,
// 	coverImg: {data:Schema.Types.Buffer, contentType:String}
// });

// bookSchema.statics.addBook = function(bookname, authorname, edition,coverimage, callback) {
//     var newBook = new Book({
//         BookName:bookname,
//         Author:authorname,
//         Edition:edition,
//         coverImg:coverimage
//     });
//     newBook.save(function(err, book){
//         //error when saving
//         if(err) {
//             callback({status:err});
//         }else //if no error, return object id
//         {
//             callback({status:"OK", id:book.id});
//         }
//    });
// }

//var Book = mongoose.model('Book', bookSchema);
//module.exports = bookSchema;