import React, { useState, useEffect } from "react";
import { FiUpload, FiFile, FiCalendar, FiUsers, FiClock } from "react-icons/fi";

interface Report {
  _id: string;
  patientId: string;
  reportType: string;
  uploadDate: string;
  filePath: string;
}

const DoctorDashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState("");
  const [reportType, setReportType] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState("upload");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reports", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !patientId || !reportType) {
      setUploadStatus("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("patientId", patientId);
    formData.append("reportType", reportType);

    try {
      const response = await fetch("http://localhost:3000/api/reports/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        setUploadStatus("Report uploaded successfully!");
        setSelectedFile(null);
        setPatientId("");
        setReportType("");
        fetchReports();
      } else {
        setUploadStatus("Failed to upload report");
      }
    } catch (error) {
      setUploadStatus("Error uploading report");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
          <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <span className="block text-sm text-gray-500">Total Reports</span>
              <span className="text-2xl font-bold text-blue-600">
                {reports.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <FiUsers className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Patients</h3>
            <p className="text-2xl font-bold">150</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <FiCalendar className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Appointments</h3>
            <p className="text-2xl font-bold">28</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
            <FiFile className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Reports</h3>
            <p className="text-2xl font-bold">{reports.length}</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-md">
            <FiClock className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "upload"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              Upload Report
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "reports"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              View Reports
            </button>
          </div>

          <div className="p-6">
            {activeTab === "upload" ? (
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient ID
                  </label>
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter patient ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select report type</option>
                    <option value="lab">Laboratory Report</option>
                    <option value="xray">X-Ray Report</option>
                    <option value="mri">MRI Report</option>
                    <option value="ct">CT Scan Report</option>
                    <option value="prescription">Prescription</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Upload Report
                </button>

                {uploadStatus && (
                  <div
                    className={`mt-4 p-4 rounded-md ${
                      uploadStatus.includes("successfully")
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {uploadStatus}
                  </div>
                )}
              </form>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {report.patientId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {report.reportType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(report.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
