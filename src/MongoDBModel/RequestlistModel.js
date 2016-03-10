var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestlistSchema = new Schema({
	BookName:String,
    Author:String,
    Edition:Number,
	BelongTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

requestlistSchema.statics.addRequestList = function(bn, au, ed, userid, callback){
    var newRequest = new RequestList({
        BookName:bn,
        Author:au,
        Edition:ed,
        BelongTo:mongoose.Types.ObjectId(userid)
    });
    
    newRequest.save(function(err, request){
       if(err){
           callback({status:err});
       }else{
           callback({status:'OK', id:request.id});
       }
    });
}

requestlistSchema.statics.searchItem = function(str, callback) {
    this.find({BookName:str}).populate('BelongTo').exec(function(err, items){
        if(err){
            callback({status:err});
        }else{
            console.log(items);
            callback({status:'OK', results:items});
        }
    });
}

var RequestList = mongoose.model('RequestList', requestlistSchema);
module.exports = RequestList;