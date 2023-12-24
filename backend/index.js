const express = require('express');
const app = express();
const port = 4000;

// Mock user and notes data
const user = { id: 1, name: 'John Doe' };
const notes = [
  { userId: 1, content: 'Note 1' },
  { userId: 1, content: 'Note 2' },
  { userId: 2, content: 'Note 3' },
];

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to WebNote!');
});

app.get('/notes', (req, res) => {
    // Filter notes for the logged-in user
    const userNotes = notes.filter(note => note.userId === user.id);
    res.json(userNotes);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
