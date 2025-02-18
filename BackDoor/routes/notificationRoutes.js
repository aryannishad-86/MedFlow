import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { sendNotification } from '../controllers/notificationcontroller.js';

const router = express.Router();

// Send a notification
router.post('/send', verifyToken, sendNotification);

// Get all notifications for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        res.json({ message: "Get all notifications route" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark notification as read
router.put('/:id/read', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Mark notification ${id} as read` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a notification
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Delete notification ${id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 