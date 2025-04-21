import { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers/userController.js';
import apiRoutes from './api/index.js';

const router = Router();



router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.use('/api', apiRoutes);

export default router;


