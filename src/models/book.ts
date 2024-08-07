import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    stock: number;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genre: { type: String, required: true },
    stock: { type: Number, required: true }
});

export default mongoose.model<IBook>('Book', BookSchema);
