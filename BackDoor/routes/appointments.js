import express from 'express';
import { createAppointment } from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authMiddleware, createAppointment);

export default router;
