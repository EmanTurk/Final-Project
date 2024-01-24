import express from 'express';

// Import controller functions for handling user-related operations
import {
  createUser,
  getAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  updateProfile
} from "../controllers/userController.js";

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

console.log ('I;m userRout')


router.post('/users', createUser);

router.post('/users/login', loginUser);

router.post('/updateProfile', protect, updateProfile);


// GET route to retrieve the currently authenticated user, protected by JWT authentication
router.get('/users/me', protect, getMe);

// GET route to retrieve all users
router.get('/users', getAllUsers);

// GET route to retrieve a specific user by ID
router.get('/users/:id', findUserById);

// PUT route to update a specific user by ID
router.put('/user',protect, updateUser);

router.delete('/users/:id', deleteUser);



export default router;
