import { Router } from 'express';
import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getProjectsUserController } from '../controllers/user.controller.js';
import { idSchema } from '../validations/id.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { userSchema, userUpdateSchema } from '../validations/user.schema.js';

const userRouter = Router();

userRouter.post('/users',
    validate(userSchema, "body"),
    createUserController);

userRouter.get('/users',
    authMiddleware,
    getAllUsersController);

userRouter.get('/users/:id',
    authMiddleware,
    validate(idSchema, "params"),
    getUserByIdController);

userRouter.get('/users/:id/projects',
    authMiddleware,
    validate(idSchema, "params"),
    getProjectsUserController);

userRouter.put('/users/:id',
    authMiddleware,
    validate(idSchema, "params"),
    validate(userUpdateSchema, "body"),
    updateUserController);

userRouter.delete('/users/:id',
    authMiddleware,
    validate(idSchema, "params"),
    deleteUserController);

export default userRouter;