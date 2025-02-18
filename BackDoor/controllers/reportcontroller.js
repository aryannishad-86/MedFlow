import MedicalReport from '../models/medicalreport.js'; 

// Upload Report Controller
export async function uploadReport(req, res) {
  try {
    const { patientId, reportData } = req.body;

    // Create a new report entry
    const newReport = new MedicalReport({
      patientId,
      reportData,
      uploadedAt: new Date(),
    });

    await newReport.save();

    res.status(201).json({ message: 'Report uploaded successfully', report: newReport });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload report' });
  }
}

// Get Report Controller (already correct)
export async function getReport(req, res) {
  try {
    const { reportId } = req.params;
    const report = await MedicalReport.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Analyze the report if needed
    const analysisResult = await mlService.analyzeReport(report.reportData);
    
    res.json({ report, analysisResult });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve report' });
  }
}
