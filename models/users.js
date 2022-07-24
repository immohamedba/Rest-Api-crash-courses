const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// geaolocation Scheama
const GeoSchama = new Schema({
    type: {
        default: "point",
        type: String
    },
    coordinate: {
        type: [Number],
        index:'2dsphere'
    }
})

const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    }, 
    // add geo location
    geometry :GeoSchama
});

const ninja = mongoose.model('ninja', NinjaSchema);
module.exports = ninja;