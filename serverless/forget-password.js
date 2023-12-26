const mongoose = require('mongoose');

const ForgetPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    },
});



// Compile and export the model
module.exports = mongoose.model('ForgetPassword', ForgetPasswordSchema);
