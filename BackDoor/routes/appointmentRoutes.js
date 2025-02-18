import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createAppointment } from '../controllers/appointmentcontroller.js';

const router = express.Router();

// Create a new appointment
router.post('/', verifyToken, createAppointment);

// Get all appointments
router.get('/', verifyToken, async (req, res) => {
    try {
        res.json({ message: "Get all appointments route" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific appointment
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Get appointment ${id} route` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an appointment
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Update appointment ${id} route` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an appointment
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Delete appointment ${id} route` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 