const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const requireAuth = require('../middleware/authMiddleware');

// GET all books (Public)
router.get('/', async (req, res) => {
  try {
    // Populate 'user' to get the username of the person who added the book
    const books = await Book.find().populate('user', 'username');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new book (Protected)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new Book({
      title,
      author,
      user: req.session.userId // Link the book to the logged-in user
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a book (Protected & Owner Only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check if the logged-in user is the owner of the book
    if (book.user.toString() !== req.session.userId) {
      return res.status(403).json({ message: "Not authorized to delete this book" });
    }

    await book.deleteOne();
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;