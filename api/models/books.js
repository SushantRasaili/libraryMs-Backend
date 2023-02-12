const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true,
    },
    publication: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    available: {
        type: Number,
        required: true
    },
    bim: {
        type: Number,
        required: true
    },
    bca: {
        type: Number,
        required: true
    },
    csit: {
        type: Number,
        required: true
    },
    totalBooks: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Books",booksSchema);