const router = require('express').Router();
const { update } = require('../models/books');
const Books = require('../models/books');

// bookName: "",
// publication: "",
// pages: null,
// quantity: null,
// bim : 0,
// csit: 0,
// bca: 0

        // ADD BOOKS ROUTE 
router.post('/addBooks',async (req,res) => {
    try {
          const {publication,pages,quantity,bim,csit,bca} = req.body;
          const bookName = req.body.bookName.toLowerCase();

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
  

   //ADD OR DELETE BOOKS
   router.put("/updateBook/:id", async (req,res) => {
            const {quantity} = req.body;
            console.log(quantity);
       try {
      const bookUpdated = await 
      Books.findByIdAndUpdate(req.params.id,{$inc: {available: quantity,totalBooks: quantity}});
      if(bookUpdated)
      res.status(200).send("Successfully book updated");
      else
      res.status(400).send("Sorry can't update the books");
       }
       
       catch(err) {
        console.log(err);
       }
   })


    //UODATE BOOK TABLE UPON LENDING THE BOOK
    router.put("/updateBookTable", async (req,res) =>  {
        try {
              const updated = await Books.findByIdAndUpdate(req.body.bookId,{$inc: {available: -1}});
              if(updated) {
                res.status(200).send("Updated");
              }
              else
              res.status(400).send("Sorry");
        }
        catch(err) {
          console.log(err);
        }
    });


    //UPDATE BOOK TABLE UPON DELETE BUTTON PRESSED
          router.put("/updateBookOnDel", async (req,res) => {
              try {
                const updated = await Books.findByIdAndUpdate(req.body.bookId,{$inc: {available: 1}});
                if(updated)
                res.status(200).send("Updated");
                else
                res.status(400).send("Can't update the books");
              }
              catch(err) {
                console.log(err);
              }
          });


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