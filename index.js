const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Use the environment port or default to 3000
const port = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(cors());

// Store submissions in-memory (note: this will be lost when server restarts)
let submissions = [];

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { leaving_from, going_to } = req.body;

    // Store the submission
    submissions.push({ leavingFrom: leaving_from, goingTo: going_to });

    console.log(`Leaving from: ${leaving_from}, Going to: ${going_to}`);

    res.send('Form data received successfully!');
});

// Provide data at /data endpoint
app.get('/data', (req, res) => {
    res.json(submissions);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
