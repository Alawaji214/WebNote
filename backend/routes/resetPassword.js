const express = require("express");
const router = express.Router();
const ForgetPassword = require('../models/forget-password')
const nodemailer = require('nodemailer');
// const { getSecret } = require('./secretManager');
const uuid = require('uuid')


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
    if ( existedForget == null) {
        const forgetPassword = new ForgetPassword({
            email: req.body.email,
            token: token
        });
        await forgetPassword.save();
    } else {
        token = existedForget.token;
    }

    const resetLink = `${process.env.APP_PROTO}://${process.env.APP_HOST}:${process.env.APP_PORT}/reset-password?token=${token}`;

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
