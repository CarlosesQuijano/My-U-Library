import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: 'Student' | 'Librarian';
    checkedOutBooks: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Student', 'Librarian'], required: true },
    checkedOutBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const User = model<IUser>('User', userSchema);

export default User;
