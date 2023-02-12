const router = require('express').Router();
const Borrowed = require('../models/borrowed');
const Books = require('../models/books');
// const { Router } = require('express');


        // AVAILABLE BOOKS ROUTE
router.get("/books/:forCourse", async (req,res) => {
    const course = req.params.forCourse.toLowerCase();
    const sem = req.query.sem;
     var query = {};
    query[course] = sem;
    try {
      const books = await Books.find(query);
      if(books) {
        res.status(200).send(books);
    }
    else {
       res.status(400).send("Sorry no books found");
    }

    }
    catch(err) {
        console.log(err);
    }
  
});

 
    // LEND BOOKS ROUTE
router.post("/lendBook", async (req,res) => {
      var lendDate;
    Date.prototype.addDays = function(days) {
        lendDate = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    var date = new Date();
    var expiryDate = date.addDays(15);


    const {stdId,stdName,sem,course,bookId,bookName,pub} = req.body;
try {
    const borrowedInf = new Borrowed({
        stdId,
        name: stdName,
        course,
        semester: sem,
        bookId,
        bookname: bookName,
        publication: pub,
        borrowedDate: lendDate,
        expiryDate
  });

  const borrowedSaved = await borrowedInf.save();
  if(borrowedSaved) {
    res.status(200).send("Successfully borrowed books saved");
  }
  else {
    res.status(400).send("Sorry something went wrong while lending the book");
  }
}
catch(err) {
    console.log(err);
}
   
});


            // BORROWED BOOKS GET METHOD ROUTE

        router.get("/borrowedBooks/:stdId", async (req,res) => {
            const id = req.params.stdId;
            try {
                const borrowedDtls = await Borrowed.find({stdId: id});
                    if(borrowedDtls) {
                       res.status(200).send(borrowedDtls);
                    }
                    else {
                        res.status(400).send("No any details of borrowed books found");
                    }
            }
            catch(err) {
                console.log(err);
            }



        });

        // DELETE BORROWED BOOKS ROUTE
router.delete("/delBorrowBooks", async(req,res) => {
      const {borrowId} = req.body;
    try {
            const deleted = await Borrowed.findByIdAndDelete(borrowId);
            if(deleted) {
                res.status(200).send("Succefully deleted the books");
            }
            else {
                res.status(400).send("Can't delete the given book");
            }
    }
    catch(err) {
            console.log(err);
    }
    


});


module.exports = router;