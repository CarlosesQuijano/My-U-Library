import { Request, Response } from 'express';
import Book from '../models/book';


export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};


export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};


export const addBook = async (req: Request, res: Response) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).send(err);
    }
};


export const updateBookStock = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.stock += req.body.stockChange;
            await book.save();
            res.json(book);
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
