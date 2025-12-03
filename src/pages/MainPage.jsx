import React, { useState } from 'react';
import books from '../data/books';
import "../App.css";

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('title');

  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === 'year') return a.year - b.year;
      return a.title.localeCompare(b.title);
    });

  return (
    <section className="main-page">
      <h2>Books</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select value={sortKey} onChange={e => setSortKey(e.target.value)}>
          <option value="title">Sort by Title (A-Z)</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      <div className="book-list">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.genre} • {book.year}</p>
            <p><strong>Rating:</strong> {book.rating || 'N/A'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
