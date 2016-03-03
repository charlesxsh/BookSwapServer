var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onlistSchema = new Schema({
	Book:Schema.Types.ObjectId,
	SellPrice:Number,
	RentPrice:Number,
	BelongTo:Schema.Types.ObjectId,
	Swap:Boolean
});

/**
 * bookid: String
 * sp: Int
 * rp: Int
 * bt: String
 * swap: boolean
 */
onlistSchema.statics.addItem = function(bookid, sp, rp, bt, swap, callback){
    var newItem = new OnList({
        Book:mongoose.Types.ObjectId(bookid),
        SellPrice:sp,
        RentPrice:rp,
        BelongTo:mongoose.Types.ObjectId(bt),
        Swap:swap
    });
    newItem.save(function(err, item){
        if(err){
            callback({status:err});
        }else{
            callback({status:"OK", id:item.id});
        }
    });
}
var OnList = mongoose.model('OnList', onlistSchema);

module.exports = OnList;