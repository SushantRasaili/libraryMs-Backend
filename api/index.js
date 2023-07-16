const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const addBooksRoute = require('./routers/addBooks');
const addStudentsRoute = require('./routers/addStudents');
const borrowedBooksRoute = require('./routers/borrowedBooks');



const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

mongoose.connect("mongodb://localhost:27017/NistLibrary")
.then(res => console.log("Succesfully connected to db"))
.catch(err => console.log(err));



app.use(express.json());

app.use("/",addBooksRoute);
app.use("/",addStudentsRoute);
app.use("/",borrowedBooksRoute);

app.get("/",(req,res)=> {
    res.send("hello");
})

app.listen(5000,()=> console.log("app running at port 5000"));