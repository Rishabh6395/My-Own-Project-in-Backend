import express from 'express';
import { getAllDevelopers, createProject } from '../controllers/authControllers'

const router = express.Router();

router.get('/', getAllDevelopers);
router.post('/project', createProject);

export default router;