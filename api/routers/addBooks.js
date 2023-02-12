const router = require('express').Router();
const Books = require('../models/books');

// bookName: "",
// publication: "",
// pages: null,
// quantity: null,
// bim : 0,
// csit: 0,
// bca: 0


router.post('/addBooks',async (req,res) => {
    try {
          const {bookName,publication,pages,quantity,bim,csit,bca} = req.body;
          const addBook = new Books({
            bookname: bookName,
            publication,
            pages,
            available: quantity,
            bim,
            csit,
            bca,
            totalBooks: quantity
          });
          const booksAdded = await addBook.save();

          if(booksAdded)
             res.status(200).send(booksAdded);
             else
             res.status(400).send("Sorry something went wrong");
    }
    catch(err) {
        console.log(err);
    }
});

//    FOR POSTAN TESTING
// {
//     "bookName": "Fundamentals of Marketing",
//     "publication": "Kriti",
//     "pages": 394,
//     "quantity": 20,
//     "bim": 5,
//     "csit": 0,
//     "bca": 0
//   }


//search books
router.get("/searchBooks",async (req,res) => {
      try {
           const books = await Books.find({bookname: {$regex: req.query.search}});
            if(books)
            res.status(200).send(books);
            else
            res.status(404).send("No such book is available");
      }
      catch(err) {
        console.log(err);
      }
});

module.exports = router;