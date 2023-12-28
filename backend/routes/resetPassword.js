const express = require("express");
const router = express.Router();
const ForgetPassword = require('../models/forget-password')
const nodemailer = require('nodemailer');
// const { getSecret } = require('./secretManager');
const uuid = require('uuid')
const User = require("../models/user");
const bcrypt = require('bcryptjs');



async function updatePassword(email, newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email: email }, { $set: { password: hash } });
}

router.post('/reset-password', async (req, res) => {
    const existedForget = await ForgetPassword.findOne({
        token: req.query.token,
        used: false
    });
    if (existedForget != null) {
        await updatePassword(existedForget.email, req.body.password);
        existedForget.used = true;
        await existedForget.save();
        res.status(200).json({status: 'password updated'})
    } else {
        return res.status(400).json({err: 'bad request'});
    }
});
router.post('/sendPasswordReset', async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }

    // Generate your password reset link or token here
    let token = uuid.v4();
    const existedForget = await ForgetPassword.findOne({
        email: req.body.email,
        used: false
    })
    if (existedForget == null) {
        const forgetPassword = new ForgetPassword({
            email: req.body.email,
            token: token
        });
        await forgetPassword.save();
    } else {
        token = existedForget.token;
    }

    const resetLink = `${process.env.WEB_PROTO}://${process.env.WEB_HOST}:${process.env.WEB_PORT}/reset-password/${token}`;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'bandr1994@gmail.com', // Your Gmail address
            clientId: process.env.GCP_CLIENT_ID,
            clientSecret: process.env.GCP_CLIENT_SECRET,
            refreshToken: process.env.GCP_REFRESH_TOKEN
        }
    });

    // Email options
    const mailOptions = {
        from: 'Bander From note App <bandr1994@gmail.com>',
        to: email,
        subject: 'Password Reset',
        text: `Please click on the following link to reset your password: ${resetLink}`
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).send('Email sent');
        }
    });

});
module.exports = router;
