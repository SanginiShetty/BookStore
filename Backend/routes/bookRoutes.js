import express from 'express';
import { Book } from '../models/bookModels.js'
import mongoose from 'mongoose';
const router = express.Router();

// Route to save a new book
router.post('/books', async(req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message:'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);


        return res.status(201).send(book);

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
 });

 // Route for Get All Books from database
 router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.messaage);
        res.status(500).send({ message: error.message });
    }
 });

 // Route for Get One Books from database by id
 router.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.messaage);
        res.status(500).send({ message: error.message });
    }
 });

//Route for update a book
router.put('/books/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).send({message: 'Book updated successfully'})

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

//Route for delete a book

router.delete('/books/:id', async(req,res) => {
    try {
        const { id } =  req.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({ message: 'Book not found'});
        }
        return res.status(200).json({message: 'Book deleted successfully'});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message});
    }
});


//book isn't found
router.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Validate the id before quering the database
router.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});
export default router;