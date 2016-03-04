var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestlistSchema = new Schema({
	Book:Schema.Types.ObjectId,
	BelongTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

requestlistSchema.statics.addRequestList = function(bookid, userid, callback){
    var newRequest = new RequestList({Book:mongoose.Types.ObjectId(bookid),
                                      BelongTo:mongoose.Types.ObjectId(userid)
                                      });
    newRequest.save(function(err, request){
       if(err){
           callback({status:err});
       }else{
           callback({status:"OK", id:request.id});
       }
    });
}

var RequestList = mongoose.model('RequestList', requestlistSchema);
module.exports = RequestList;