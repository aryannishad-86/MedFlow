import { spawn } from 'child_process';

export async function analyzeReport(reportData) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['./ml_model/analyze.py', reportData]);

    pythonProcess.stdout.on('data', (data) => {
      resolve(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
      reject(data.toString());
    });
  });
}
