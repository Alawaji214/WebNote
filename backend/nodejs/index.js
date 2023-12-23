const express = require('express');
const app = express();
const port = 4000;

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to WebNote!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
