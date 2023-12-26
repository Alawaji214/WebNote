const Note = require('../models/note'); // assuming you have a Note model

const resolvers = {
    Query: {
        // Fetch multiple notes for a given user
        async notes(_, args, context) {
            console.log(args)
            console.log(context.user.userId)
            if (!context.user) throw new Error('Not Authenticated');
            return await Note.find({userId: context.user.userId});
        },
        // Fetch a single note by ID
        async note(_, {id}, context) {
            if (!context.user) throw new Error('Not Authenticated');
            return await Note.findOne({ _id: id, userId: context.user.userId });
        },
    },
    Mutation: {
        // Add a new note
        async addNote(_, { content },context ) {
            if (!context.user) throw new Error('Not Authenticated');
            const newNote = new Note({ content, userId: context.user.userId });
            await newNote.save();
            return newNote;
        },
        // Update an existing note
        async updateNote(_, { id, content },context ) {
            if (!context.user) throw new Error('Not Authenticated');
            return await Note.findOneAndUpdate({
                    _id: id,
                    userId: context.user.userId
                },
                { $set: {content:  content } });
        },
        // Delete a note
        async deleteNote(_, { id }, context) {
            if (!context.user) throw new Error('Not Authenticated');
            return await Note.deleteOne({
                userId: context.user.userId,
                _id: id
            });
        },
    },
};

module.exports = resolvers;
