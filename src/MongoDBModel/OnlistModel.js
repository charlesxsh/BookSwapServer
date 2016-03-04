var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bookSchema = require('./src/MongoDBModel/BookSchema')

var onlistSchema = new Schema({
	BookName:String,
    Author:String,
    Edition:Number,
    coverImg:{data: Schema.Types.Buffer, contentType:String},
	SellPrice:Number,
	RentPrice:Number,
	BelongTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	Swap:Boolean
});

/**
 * bookid: String
 * sp: Int
 * rp: Int
 * bt: String
 * swap: boolean
 */
onlistSchema.statics.addItem = function(bn, au, ed, img, sp, rp, bt, swap, callback){
    var newItem = new OnList({
        BookName:bn,
        Author:au,
        Edition:ed,
        coverImg:img,
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