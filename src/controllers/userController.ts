import { Request, Response } from 'express';
import User from '../models/user';
import Book from '../models/book';


export const addUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const checkoutBook = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        const book = await Book.findById(req.params.bookId);

        if (user && book && book.stock > 0) {
            user.checkedOutBooks.push(book._id);
            book.stock -= 1;
            await user.save();
            await book.save();
            res.json({ user, book });
        } else {
            res.status(400).send('Libro no disponible o usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

// Devolver un libro
export const returnBook = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        const book = await Book.findById(req.params.bookId);

        if (user && book) {
            user.checkedOutBooks = user.checkedOutBooks.filter(
                (id) => id.toString() !== book._id.toString()
            );
            book.stock += 1;
            await user.save();
            await book.save();
            res.json({ user, book });
        } else {
            res.status(400).send('Libro o usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
