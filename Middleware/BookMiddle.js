const { response } = require("express");
const Book = require("../Models/Bookshema");
const { adminverifytoken } = require("./Adminjwtverify");
const mongoose= require("mongoose")


exports.Addbook = async (req, res) => {
    const { bookname, price, title, description, image, author, publishdate } = req.body;
    try {
        const newBook = await Book.create({
            bookname: bookname,
            price: price,
            title: title,
            description: description,
            image: image,
            author: author,
            publishdate: new Date('2024-07-27T10:00:00')

        })
        return res.status(201).json({ response: newBook });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

exports.GetBook = async (req, res) => {
    const id = req.params.id;
    console.log('Requested ID:', id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ObjectId format' });
    }
    try {
        const data = await Book.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.GetAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.DeleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.UpdateBook = async (req, res) => {
    const { id } = req.params;
    const { bookname, price, title, description, image, author, publishdate } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                bookname: bookname,
                price: price,
                title: title,
                description: description,
                image: image,
                author: author,
                publishdate: new Date('2024-07-27T10:00:00'),
            },
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.DeleteAllBooks = async (req, res) => {
    try {
        await Book.deleteMany({});
        return res.status(200).json({ message: 'All books deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

