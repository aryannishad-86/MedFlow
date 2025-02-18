import { scheduleJob } from 'node-schedule';

const reminders = [];

export function scheduleMedicationReminders() {
  reminders.forEach(reminder => {
    scheduleJob(reminder.time, function() {
      console.log(`Reminder: ${reminder.message} for Patient ${reminder.patientId}`);
    });
  });
}

export function addReminder(patientId, message, time) {
  reminders.push({ patientId, message, time });
}
