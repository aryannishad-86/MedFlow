export const generateQR = async (req, res) => {
  try {
    const { patientId } = req.body;
    const qrData = `https://yourapp.com/reports/${patientId}`;
    const qrCode = await QRCode.toDataURL(qrData);
    res.json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: 'QR Code generation failed' });
  }
};

export const scanQR = async (req, res) => {
  try {
    const { qrData } = req.body;
    res.json({ message: `Fetching report for ${qrData}` });
  } catch (err) {
    res.status(500).json({ error: 'QR Code scanning failed' });
  }
};
