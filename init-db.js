// Database initialization script
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database connection
const db = new sqlite3.Database('./books.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to the books database.');
    
    // Create books table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        title TEXT NOT NULL,
        genre TEXT NOT NULL,
        price NUMERIC NOT NULL,
        UNIQUE(author, title)
    )`, (err) => {
        if (err) {
            console.error('Error creating books table:', err.message);
            return;
    }
        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
                return;
            }
            console.log('Database initialized successfully. Closed the database connection.');
        });
    });
});