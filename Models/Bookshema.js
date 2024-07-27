const mongoose = require("mongoose");

const Bookschema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishdate: {
        type: Date,
        required: true,
    },
});

const Book = mongoose.model("book",Bookschema)
module.exports = Book;
