
/* ===============================================
File Name: COMP308-W2017-MidTerm-300776816
Author's Name:Mekhal Ganesh
Student ID:300776816
Web App Name: https://comp308-w2017-midterm300776816.herokuapp.com/

===================================================  */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
res.render('books/details',{ //rendering the path
  title:"Add Books ", //Passing the title to the details page 
  books:''  // passing the book prperty value blank.
})
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
 let newBook = book({
      "Title": req.body.title, // get the details from the appropriate textfield 
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre 
    });
     book.create(newBook, (err, book) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    });
    

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one book by its id
      book.findById(id, (err, books) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the book details view
          res.render('books/details', {
              title: 'Book Details',
              books: books
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
});
    


// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    // get a reference to the id from the url
    let id = req.params.id;

     let updatedbook = book({
       "_id": id,
      "Title": req.body.title, // get the details from the appropriate textfield 
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre 
    });

    book.update({_id: id}, updatedbook, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the books List
        res.redirect('/books');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

     // get a reference to the id from the url
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the books list
        res.redirect('/books');
      }
    }); 
   
});


module.exports = router;
