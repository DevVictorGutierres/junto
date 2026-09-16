import { createProjectController, getAllProjectsController, getProjectByIdController, updateProjectController, deleteProjectController, applyToProjectController, quitFromProjectController, getUsersOfProjectController } from '../controllers/project.controller.js';
import { projectFiltersSchema } from '../validations/filter.project.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idSchema } from '../validations/id.schema.js';
import { projectSchema, updateProjectSchema } from '../validations/project.schema.js';
import { Router } from 'express';

const projectRouter = Router();

projectRouter.post('/projects',
    authMiddleware,
    validate(projectSchema, "body"),
    createProjectController);

projectRouter.get('/projects',
    validate(projectFiltersSchema, "query"),
    getAllProjectsController);

projectRouter.get('/projects/:id',
    validate(idSchema, "params"),
    validate(projectFiltersSchema, "query"),
    getProjectByIdController);

projectRouter.get('/projects/:id/users',
    authMiddleware,
    validate(idSchema, "params"),
    getUsersOfProjectController);

projectRouter.put('/projects/:id',
    authMiddleware,
    validate(idSchema, "params"),
    validate(updateProjectSchema, "body"),
    updateProjectController);

projectRouter.delete('/projects/:id',
    authMiddleware,
    validate(idSchema, "params"),
    deleteProjectController);

projectRouter.patch('/projects/:id/apply',
    authMiddleware,
    validate(idSchema, "params"),
    applyToProjectController);

projectRouter.patch('/projects/:id/quit',
    authMiddleware,
    validate(idSchema, "params"),
    quitFromProjectController);

export default projectRouter;