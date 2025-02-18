export function handleError(res, error, message = 'Something went wrong') {
    console.error(error);
    res.status(500).json({ error: message });
  }
  