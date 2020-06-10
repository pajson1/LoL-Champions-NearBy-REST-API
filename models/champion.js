const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

// create champion Schema & model
const ChampionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    availability: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Champion = mongoose.model('champion', ChampionSchema);

module.exports = Champion;
