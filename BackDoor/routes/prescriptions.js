import { Router } from 'express';
import { addPrescription } from '../controllers/prescriptioncontroller.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/add', authMiddleware, addPrescription);

export default router;