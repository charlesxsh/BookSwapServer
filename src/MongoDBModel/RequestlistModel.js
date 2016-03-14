var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestlistSchema = new Schema({
	bookName:String,
    authorName:String,
    edition:Number,
	belongTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

requestlistSchema.statics.addRequestList = function(bn, au, ed, userid, callback){
    var newRequest = new RequestList({
        bookName:bn,
        authorName:au,
        edition:ed,
        belongTo:mongoose.Types.ObjectId(userid)
    });
    
    newRequest.save(function(err, request){
       if(err){
           callback({status:err});
       }else{
           callback({status:'OK', id:request.id});
       }
    });
}

requestlistSchema.statics.searchItem = function(json, callback) {
    if ('belongTo' in json) {
        json['belongTo'] = mongoose.Types.ObjectId(json['belongTo'])
    }
    this.find(json).populate('belongTo').exec(function(err, items){
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