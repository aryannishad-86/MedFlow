import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all prescriptions
router.get('/', verifyToken, async (req, res) => {
    try {
        res.json({ message: "Get all prescriptions route" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific prescription
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Get prescription ${id} route` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new prescription
router.post('/', verifyToken, async (req, res) => {
    try {
        res.json({ message: "Create prescription route" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a prescription
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Update prescription ${id} route` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 