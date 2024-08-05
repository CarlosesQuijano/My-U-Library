import { Router } from 'express';
import { addUser, getUsers, checkoutBook, returnBook } from '../controllers/userController';

const router = Router();

router.get('/', getUsers); 
router.post('/', addUser); 
router.post('/:userId/checkout/:bookId', checkoutBook); 
router.post('/:userId/return/:bookId', returnBook); 

export default router;
