import { Router } from 'express';
import { getBooks, getBookById, addBook, updateBookStock } from '../controllers/bookController';

const router = Router();

router.get('/', getBooks); 
router.get('/:id', getBookById); 
router.post('/', addBook); 
router.put('/:id/stock', updateBookStock); 

export default router;
