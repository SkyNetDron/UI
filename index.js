// Import required modules
const express = require('express');
const path = require('path');
const app = express();

// Use the environment port or default to 3000
const port = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const leavingFrom = req.body.leaving_from;
    const goingTo = req.body.going_to;

    console.log(`Leaving from: ${leavingFrom}, Going to: ${goingTo}`);

    res.send('Form data received successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});