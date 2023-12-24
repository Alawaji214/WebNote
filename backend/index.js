require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = 4000;

const userRoutes = require('./routes/userRoute')
const noteRoutes = require('./routes/noteRoute')

// Mock user and notes data
const user = { id: 1, name: 'John Doe' };
const notes = [
  { userId: 1, content: 'Note 1' },
  { userId: 1, content: 'Note 2' },
  { userId: 2, content: 'Note 3' },
];

app.use(express.json());

app.use('/v1/user', userRoutes);
app.use('/v1/note', noteRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to WebNote!');
});

app.get('/notes', (req, res) => {
    // Filter notes for the logged-in user
    const userNotes = notes.filter(note => note.userId === user.id);
    res.json(userNotes);
});

// Function to start the server
async function startServer() {
    try {
        await connectDB();  // Wait for database connection
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1); // Exit process with failure
    }
}

// Start the server
startServer();