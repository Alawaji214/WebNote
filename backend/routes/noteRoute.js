const express = require("express");
const router = express.Router();
const User  = require("../models/user");
const Note  = require("../models/note");

const authenticateToken = require("../middlewares/authenticateToken");

router.get("/note",authenticateToken, async (req, res) => {
    try {
        const userNotes = await Note.find({
            userId: req.user.userId
        });
        res.status(201).json(userNotes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post("/note",authenticateToken, async (req, res) => {
    try {
        const newNote = new Note({
            content: req.body.content,
            userId: req.user.userId
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete("/note/:noteId",authenticateToken, async (req, res) => {
    try {
        const userNotes = await Note.findAll({
            userId: req.user.userId,
            __id: req.params.noteId
        });
        res.status(201).json(userNotes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put("/note/:noteId",authenticateToken, async (req, res) => {
    try {
        console.log(req.params.noteId)
        const originalNote = await Note.findOneAndUpdate({
            _id: req.params.noteId,
            userId: req.user.userId
        },
        { $set: {content:  req.body.content } });
        res.status(200).json(originalNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
