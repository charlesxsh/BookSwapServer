var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('./src/MongoDBModel/ImageModel')

var onlistSchema = new Schema({
	bookName:String,
    authorName:String,
    edition:Number,
    coverImg:[{type: mongoose.Schema.Types.ObjectId,ref: 'Image'}],
	sellPrice:Number,
	rentPrice:Number,
	belongTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	swap:Boolean
});

onlistSchema.set('toJSON', { getters: true});

onlistSchema.statics.addItem = function(bn, au, ed, sp, rp, bt, swap, callback){
    var newItem = new OnList({
        bookName:bn,
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

onlistSchema.statics.addImage = function(id, img, callback) {
    var newImg = new Image({
        image: new Buffer(img, 'base64')
    });
    var self = this;
    newImg.save(function(err, retImg){
        if(err) {
            callback(err);
            return;
        }
        self.findByIdAndUpdate(id, {$push: {items: item}},
        function (err, found) {
            if(err) {
                callback(err);
                return;
            } else {
                callback({status:'OK'});
            }
        });
        
    });
    
}
var OnList = mongoose.model('OnList', onlistSchema);

module.exports = OnList;