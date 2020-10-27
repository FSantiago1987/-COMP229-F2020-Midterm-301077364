// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book controller
let bookController = require('../controllers/book')

/* GET books List page. READ */
router.get('/', bookController.displayBookList);

//  GET the Book Details page in order to add a new Book
router.get('/add', bookController.displayAddPage);

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', bookController.processAddPage);

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', bookController.displayEditPage);

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', bookController.processEditPage);

// GET - process the delete by user id
router.get('/delete/:id', bookController.processDeletion);

module.exports = router;
