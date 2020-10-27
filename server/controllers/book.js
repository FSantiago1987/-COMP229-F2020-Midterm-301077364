let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Book = require('../models/books');


/* Display books List function */
module.exports.displayBookList = (req, res, next) => {
    Book.find( (err, books) => {
        if (err) {
          return console.error(err);
        }
        else 
        {
          res.render('books/index', {
            title: 'Books',
            books: books
          });
        }
      });    
};

/* Display Add Page function */
module.exports.displayAddPage = (req, res, next) => {
    Book.find((err, books) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('books/details',
            {title: 'Add Book',
            books: books,
            });
        }
    });
};

/* Process Add Page function */
module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    Book.create(newBook, (err, Book) =>{
        if(err){
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');
        }
    });
}

/* Display Edit Page function */
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Book.findById(id, (err, books) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.render('books/details',{
            title: 'Edit Book',
            books: books,
            });
        }
    });
};

/* Process Edit Page function */
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedBook = Book({
        "_id": id,
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    Book.updateOne({_id:id}, updatedBook, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');
        }
    });
};

/* Process deletion function */
module.exports.processDeletion = (req, res, next) => {
    let id = req.params.id;
    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else 
        {
            res.redirect('/books');
        }
    })
}