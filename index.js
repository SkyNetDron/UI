const express = require('express');
const path = require('path');
const cors = require('cors'); // CORS 모듈 추가
const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use(cors()); // 모든 출처에 대해 CORS를 허용합니다.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory data store
let submissions = [];

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { leaving_from, going_to } = req.body;
    console.log(`Leaving from: ${leaving_from}, Going to: ${going_to}`);
    
    // Store the submitted data
    submissions.push({ leavingFrom: leaving_from, goingTo: going_to });
    
    res.send('Form data received successfully!');
});

// Provide data at root endpoint
app.get('/submissions', (req, res) => {
    res.json(submissions);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
