import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

const app = express();


app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/mibibliotecau')
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(err => {
        console.error('No se pudo conectar a MongoDB', err);
    });

export default app;
