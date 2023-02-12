const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    roll: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    email: {
        type: String,
       
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("students",studentSchema);