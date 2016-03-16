var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bookSchema = require('./src/MongoDBModel/BookSchema')

var onlistSchema = new Schema({
	bookName:String,
    authorName:String,
    edition:Number,
    coverImg:{type:Buffer, get:function(img){
        return img.toString('base64');
    }},
	sellPrice:Number,
	rentPrice:Number,
	belongTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	swap:Boolean
});

onlistSchema.set('toJSON', { getters: true});
onlistSchema.statics.addItem = function(bn, au, ed, img, sp, rp, bt, swap, callback){
    var newItem = new OnList({
        bookName:bn,
        coverImg:new Buffer(img, 'base64'),
        authorName:au,
        edition:ed,
        sellPrice:sp,
        rentPrice:rp,
        belongTo:mongoose.Types.ObjectId(bt),
        swap:swap
    });
    newItem.save(function(err, item){
        if(err){
            callback({status:err});
        }else{
            console.log("Save book on list successfully");
            callback({status:"OK", id:item.id});
        }
    });
}

onlistSchema.statics.searchItem = function(json, callback) {
    if ('belongTo' in json) {
        json['belongTo'] = mongoose.Types.ObjectId(json['belongTo'])
    }
    this.find(json).populate('belongTo').exec(function(err, items){
        if(err){
            callback({status:err});
        }else{
            callback({status:'OK', results:items});
        }
    });
}

var OnList = mongoose.model('OnList', onlistSchema);

module.exports = OnList;