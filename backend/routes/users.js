// routes/users.js
import express from 'express';
import { createUser, getAllUsers, getUserByName, updateUser, deleteUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.post('/login', loginUser);

router.get('/name/:name', getUserByName);
router.put('/name/:name', updateUser);
router.delete('/name/:name', deleteUser);

export default router;
