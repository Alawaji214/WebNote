const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./user'); // Adjust the path as needed
const ForgetPassword = require('./forget-password'); // Adjust the path as needed

// Initialize database connection
mongoose.connect(process.env.MONGODB_URI);

async function updatePassword(email, newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email: email }, { $set: { password: hash } });
}

exports.resetPassword = async (req, res) => {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const token = req.query.token; // Adjust according to how you receive the token
        const password = req.body.password; // Make sure to parse JSON body if needed

        const existedForget = await ForgetPassword.findOne({
            token: token,
            used: false
        });

        if (existedForget) {
            await updatePassword(existedForget.email, password);
            existedForget.used = true;
            await existedForget.save();
            res.status(200).json({ status: 'password updated' });
        } else {
            res.status(400).json({ err: 'bad request' });
        }
    } catch (error) {
        res.status(500).json({ err: 'internal server error' });
    }
};
