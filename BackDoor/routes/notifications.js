import { Router } from 'express';
import { sendNotification } from '../controllers/notificationcontroller.js';
const router = Router();

router.post('/send', sendNotification);

export default router;
