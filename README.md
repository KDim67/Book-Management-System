# Book Management System

## Overview
This is a simple Book Management System web application that allows users to register new books and search for existing books in a database. The application features a clean, modern UI with a blurred glass effect background, animated buttons, and a toggle switch to navigate between registration and search functionalities.

## Screenshots

### Registration Interface

![Registration Interface](screenshots/registration-screenshot.png)

### Search Interface

![Search Interface](screenshots/search-screenshot.png)

## Features
- **Book Registration**: Add new books with author, title, genre, and price information
- **Book Search**: Search for books by title keywords
- **Modern UI**: Responsive design with animations and visual effects
  - Blurred glass effect container
  - Animated buttons with hover effects
  - Custom styled input fields with highlight animations
  - Custom dropdown menu for genre selection
  - Custom scrollbar for search results
- **Toggle Switch**: Easy navigation between registration and search interfaces with custom icons
- **Data Validation**: Client-side validation for price field

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3

## Prerequisites
- Node.js and npm installed on your computer

## Installation and Setup
1. Clone this repository
2. Navigate to the project directory in your terminal
3. Install the required dependencies:
   ```
   npm install
   ```
4. The database table will be automatically created when you start the server. If you want to initialize it separately, you can run:
   ```
   node init-db.js
   ```
5. Start the server:
   ```
   node server.js
   ```
   or
   ```
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000`

## Usage

### Register a New Book
1. Make sure the toggle switch is in the left position (default)
2. Fill in the author, title, select a genre, and enter a price
3. Click the "Register" button
4. A success message will appear if the book was registered successfully

### Search for Books
1. Toggle the switch to the right position to access the search interface
2. Enter a keyword in the search field
3. Click the "Search" button
4. Results will be displayed below, showing all books with titles matching the keyword

## API Endpoints
- `GET /books/:keyword` - Search for books by keyword in title
- `POST /books` - Register a new book

## Database Structure
The application uses a SQLite database with a single table:

**Books Table**:
- author (text)
- title (text)
- genre (text)
- price (numeric)

## UI Assets
The application uses the following assets for its visual design:
- `library.jpg`: Background image for the application
- `register-icon.png`: Icon for the registration toggle
- `search-icon.png`: Icon for the search toggle


