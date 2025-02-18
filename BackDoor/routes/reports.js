const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// Ensure uploads directory exists
const fs = require('fs');
const path = require('path');
const uploadDir = 'uploads/medical-reports';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// POST /api/reports/upload
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const report = new Report({
      patientId: req.body.patientId,
      doctorId: req.user._id, // from auth middleware
      reportType: req.body.reportType,
      filePath: req.file.path
    });

    await report.save();

    res.status(201).json({
      message: 'Report uploaded successfully',
      report: {
        id: report._id,
        patientId: report.patientId,
        reportType: report.reportType,
        uploadDate: report.uploadDate
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading report', error: error.message });
  }
});

// GET /api/reports/patient/:patientId
router.get('/patient/:patientId', auth, async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.params.patientId })
      .sort({ uploadDate: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
});

module.exports = router;