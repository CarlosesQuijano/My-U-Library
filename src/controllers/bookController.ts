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
        const { id } = req.params;
        const { stock } = req.body;

        const stockNumber = Number(stock);
        if (isNaN(stockNumber)) {
            return res.status(400).json({ message: 'El campo stock debe ser un número válido' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        book.stock = stockNumber;
        await book.save();

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el stock del libro', error });
    }
};
