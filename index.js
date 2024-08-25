const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer'); // Multer for handling file uploads
const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use(cors()); // 모든 출처에 대해 CORS를 허용합니다.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
    }
});
const upload = multer({ storage: storage });

// In-memory data store
let submissions = [];

// Serve the index.html file for users
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the admin.html file for administrators
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve mypage.html for users
app.get('/mypage.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'mypage.html'));
});

// Handle form submission with file upload
app.post('/submit-form', upload.single('photo'), (req, res) => {
    const { leaving_from, going_to } = req.body;
    
    console.log(`Leaving from: ${leaving_from}, Going to: ${going_to}`);
    
    // Store the submitted data
    submissions.push({ leavingFrom: leaving_from, goingTo: going_to });
    
    res.send('Form data received successfully!');
});

// Provide data at /data endpoint (for admin use)
app.get('/data', (req, res) => {
    res.json(submissions);
});

// Clear data at /clear endpoint (for admin use)
app.delete('/clear', (req, res) => {
    submissions = []; // Clear the submissions array
    res.send('Submissions cleared successfully!');
});

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});