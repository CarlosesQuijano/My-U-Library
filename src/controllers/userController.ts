import { Request, Response } from 'express';
import User from '../models/user';
import Book from '../models/book';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


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
        const { userId, bookId } = req.params;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'Usuario o libro no encontrado' });
        }

        if (book.stock <= 0) {
            return res.status(400).json({ message: 'No hay stock disponible para este libro' });
        }

        // Actualiza el stock del libro y los libros solicitados por el usuario
        book.stock -= 1;
        user.checkedOutBooks.push(book._id as mongoose.Types.ObjectId);

        await book.save();
        await user.save();

        res.status(200).json({ message: 'Libro solicitado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al solicitar el libro', error });
    }
};

export const returnBook = async (req: Request, res: Response) => {
    try {
        const { userId, bookId } = req.params;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'Usuario o libro no encontrado' });
        }

        // Asegúrate de que book._id es tratado como ObjectId
        const bookIdObject = book._id as mongoose.Types.ObjectId;

        // Actualiza el stock del libro y los libros solicitados por el usuario
        book.stock += 1;
        user.checkedOutBooks = user.checkedOutBooks.filter(
            (id) => id.toString() !== bookIdObject.toString()
        );

        await book.save();
        await user.save();

        res.status(200).json({ message: 'Libro devuelto exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al devolver el libro', error });
    }
};
