import app from './app';
import userRoutes from './routes/userRoutes'; 
app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor está corriendo en el puerto ${PORT}`);
});
