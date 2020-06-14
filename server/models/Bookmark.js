const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Declare Bookmark Schema
const BookmarkSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Title must be unique"]
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

module.exports = mongoose.model('Bookmark', BookmarkSchema);
