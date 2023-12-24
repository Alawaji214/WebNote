const express = require("express");
const router = express.Router();
const User  = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne(
            { username: req.body.username }
        );
        if (user && (await user.comparePassword(req.body.password))) {
            // Create the token payload
            const payload = {
                userId: user.id,
                username: user.username,
            };

            // Generate a token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.json({
                message: "Authentication successful!",
                token: token,
            });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
