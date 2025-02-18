export async function sendNotification(req, res) {
  try {
    const { message, userId } = req.body;
    console.log(`Sending notification to ${userId}: ${message}`);
    res.json({ message: 'Notification sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
}