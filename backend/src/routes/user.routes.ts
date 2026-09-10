import { Router } from 'express';
import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getProjectsUserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { userSchema, userUpdateSchema } from '../validations/user.schema.js';

const userRouter = Router();

userRouter.post('/users',
    validate(userSchema),    
    createUserController);

userRouter.get('/users',
    authMiddleware,
    getAllUsersController);

userRouter.get('/users/:id',
    authMiddleware,
    getUserByIdController);

userRouter.get('/users/:id/projects',
    authMiddleware,
    getProjectsUserController);

userRouter.put('/users/:id',
    authMiddleware,
    validate(userUpdateSchema),
    updateUserController);

userRouter.delete('/users/:id',
    authMiddleware,
    deleteUserController);

export default userRouter;