const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Declare Bookmark Schema
const Bookmark = new Schema({
    title: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        enum: ['LOW', 'MID', 'HIGH'],
        default: 'LOW'
    }
});

// Other types:
// Boolean
// Number

module.exports = mongoose.model('Bookmark', Bookmark);
