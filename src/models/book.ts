import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    stock: number;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genre: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 }
});

const Book = model<IBook>('Book', bookSchema);

export default Book;
