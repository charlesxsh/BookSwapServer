var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    image:{type:Buffer, get:function(profie) {
        return profie.toString('base64');}
    }
});

ImageSchema.set('toJSON', { getters: true});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;