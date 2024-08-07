import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    checkedOutBooks: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    checkedOutBooks: [{ type: mongoose.Types.ObjectId, ref: 'Book' }]
});

export default mongoose.model<IUser>('User', UserSchema);
