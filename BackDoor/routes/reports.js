import { Router } from 'express';
import { uploadReport } from '../controllers/reportcontroller.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/upload', authMiddleware, uploadReport);

export default router;