const mongoose = require('mongoose');


const borrowedSchema = new mongoose.Schema({
    stdId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    // roll: {
    //     type: Number,
    //     required: true,
    // },
    bookId: {
        type: String,
        required: true
    },
    bookname: {
        type: String,
        required: true
    },
    publication: {
        type: String,
        required: true
    },
    borrowedDate: {
        type: Date,
        required: true  
    },
    expiryDate: {
        type: Date,
        required: true
    }
    // fine: {           
    //     type: Number,        JUST CALCULATE THESE TWO FIELDS IN THE RUN TIME
    //     required: true
    // },
    // exceededDay: {
    //     type: Number,
    //     required: true
    // }
},
{
    timestamps: true
});

module.exports = mongoose.model("borrowed",borrowedSchema);
