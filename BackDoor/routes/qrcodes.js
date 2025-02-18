import { Router } from 'express';
import { generateQR, scanQR } from '../controllers/qrcontroller.js';

const router = Router();

router.post('/generate', generateQR);
router.post('/scan', scanQR);

export default router;
