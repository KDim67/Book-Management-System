// Import required modules
const express = require('express'); // Import Express.js framework
const bodyParser = require('body-parser'); // Middleware to parse request body
const sqlite3 = require('sqlite3').verbose(); // SQLite library
const path = require('path'); // Node.js path module

// Initialize Express application
const app = express(); // Create an instance of Express
const port = 3000; // Port number for server

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Connect to SQLite database
const db = new sqlite3.Database('./books.sqlite', (err) => {
    if(err) {
        console.error(err.message); // Log error if connection fails
    }
    console.log('Connected to the books database.') // Log success message
});

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// Route to search for books based on keyword
app.get('/books/:keyword', (req, res) => {
    const keyword = req.params.keyword; // Get search keyword from request parameters
    const query = `SELECT * FROM books WHERE title LIKE ?`; // SQL query to search for books
    db.all(query, [`%${keyword}%`], (err, rows) => { // Execute SQL query with parameterized input
        if(err) {
            res.status(400).json({ error: err.message }); // Return error response if query fails
            return;
        }
        res.json(rows); // Return JSON response with search results
        res.end(); // End response
    });
});

// Route to add a new book
app.post('/books', (req, res) => {
    const { author, title, genre, price } = req.body; // Get book details from request body
    const checkQuery = `SELECT COUNT(*) AS count FROM books WHERE title = ? AND author = ?`; // SQL query to check if the book already exists
    db.get(checkQuery, [title, author], (err, row) => { // Execute SQL query to check if the book exists
        if (err) {
            res.status(400).json({ error: err.message }); // Return error response if query fails
            return;
        }
        if (row.count > 0) { // If the book already exists, return an error response
            res.status(400).json({ error: 'Book already exists' });
            return;
        }
        // If the book doesn't exist, proceed to insert it into the database
        const insertQuery = `INSERT INTO books (author, title, genre, price) VALUES (?, ?, ?, ?)`; // SQL query to insert new book
        db.run(insertQuery, [author, title, genre, price], function(err) { // Execute SQL query with parameterized input
            if (err) {
                res.status(400).json({ error: err.message }); // Return error response if query fails
                return;
            }
            res.json({ id: this.lastID, message: 'Book added successfully' }); // Return JSON response with success message
        });
    });
});


// Start server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`); // Log server start message
});