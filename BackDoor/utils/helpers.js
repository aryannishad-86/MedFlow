import { randomBytes } from 'crypto';

export function generateUniqueId() {
  return randomBytes(16).toString('hex');
}

export function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}
