import React, { useEffect, useState } from 'react';
import "../App.css"; 

export default function MainPage() {
  const [books, setBooks] = useState([]);
  
  // State for the new book form
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: ''
  });

  // 1. Fetch books from Database when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  // 2. Handle typing in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Adding a New Book (POST Request)
  const handleAddBook = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' // CRITICAL: Sends your session cookie so backend knows who you are
      });

      if (response.ok) {
        const newBook = await response.json();
        setBooks([...books, newBook]); // Update UI instantly
        setFormData({ title: '', author: '', description: '', price: '' }); // Clear form
        alert("Book added successfully!");
      } else {
        alert("Failed to add book. Are you logged in?");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // 4. Handle Deleting a Book (DELETE Request)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
        credentials: 'include' // CRITICAL: Checks if you own this book
      });

      if (response.ok) {
        setBooks(books.filter(b => b._id !== id)); // Remove from UI
      } else {
        const errorData = await response.json();
        alert(errorData.message || "You can't delete this book (You must be the owner)!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-page">
      <h1>My Library App</h1>

      {/* --- ADD BOOK FORM --- */}
      <div className="add-book-form" style={{ border: '2px solid #333', padding: '20px', margin: '20px auto', maxWidth: '500px', borderRadius: '8px' }}>
        <h3>Add a New Book</h3>
        <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" name="title" placeholder="Title" 
            value={formData.title} onChange={handleChange} required 
            style={{ padding: '8px' }}
          />
          <input 
            type="text" name="author" placeholder="Author" 
            value={formData.author} onChange={handleChange} required 
            style={{ padding: '8px' }}
          />
          <input 
            type="text" name="description" placeholder="Description" 
            value={formData.description} onChange={handleChange} 
            style={{ padding: '8px' }}
          />
          <input 
            type="number" name="price" placeholder="Price" 
            value={formData.price} onChange={handleChange} required 
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
            Add Book
          </button>
        </form>
      </div>

      {/* --- BOOK LIST --- */}
      <div className="book-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {books.length === 0 ? <p>No books found. Add one above!</p> : null}
        
        {books.map(book => (
          <div key={book._id} className="book-card" style={{ border: '1px solid #ddd', padding: '15px', width: '250px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p style={{ fontSize: '0.8em', color: '#666' }}>Added by: {book.user?.username || 'Unknown'}</p>
            <button 
              onClick={() => handleDelete(book._id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginTop: '10px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
