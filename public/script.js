// Event listener for register button
document.getElementById('register-button').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Retrieve input values
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const price = document.getElementById('price').value;

    // Check if price is a valid number and greater than 0
    if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price');
        return;
    }

    // Create book object with input values
    const book = { author, title, genre, price };

    // Send POST request to '/books' endpoint with book data
    fetch('/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json()) // Parse response JSON
    .then(data => {
        // Check for errors in response data
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert('Book registered successfully!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while registering the book.');
    });
});

// Event listener for search button
document.getElementById('search-button').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Retrieve search keyword
    const keyword = document.getElementById('search-keyword').value.toLowerCase();

    // Send GET request to '/books/:keyword' endpoint
    fetch(`/books/${keyword}`)
        .then(response => response.json()) // Parse response JSON
        .then(data => {
            const booksList = document.getElementById('books-list');
            booksList.innerHTML = ''; // Clear previous search results
            
            // Check if any books were found
            if (data.length === 0) { // Using === to check if two values are equal in both value and type
                // Display message if no books found
                const noBooksFoundMessage = document.createElement('div');
                noBooksFoundMessage.classList.add('no-books-found');
                noBooksFoundMessage.textContent = 'No books found.';
                booksList.appendChild(noBooksFoundMessage);
            } else {
                // Display each book found                
                data.forEach(book => {
                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book-item');
                    const bookDetails = document.createElement('p');
                    bookDetails.classList.add('book-details');
                    // Display book details
                    bookDetails.innerHTML = `<span>Author:</span> ${book.author}<br><span>Title:</span> ${book.title}<br><span>Genre:</span> ${book.genre}<br><span>Price:</span> ${book.price}`;
                    bookDiv.appendChild(bookDetails);
                    booksList.appendChild(bookDiv);
                });
            }
            booksList.style.display = 'block'; // Display search results
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while searching for books.');
        });
});

// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggle-switch');
    const registrationSection = document.getElementById('registration');
    const searchSection = document.getElementById('search');

    // Function to update active section based on toggle switch
    const updateSections = () => {
        if (toggleSwitch.checked) {
            registrationSection.classList.remove('active');
            searchSection.classList.add('active');
        } else {
            registrationSection.classList.add('active');
            searchSection.classList.remove('active');
        }
    };

    updateSections(); // Call updateSections initially

    toggleSwitch.addEventListener('change', updateSections); // Add change event listener to toggle switch
});
