const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
});


// Compile and export the model
module.exports = mongoose.model('Note', NoteSchema);
