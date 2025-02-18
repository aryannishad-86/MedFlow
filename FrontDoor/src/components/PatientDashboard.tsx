import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Profile {
  fullName: string;
  email: string;
  phone: string;
  // add other profile fields as needed
}

const PatientDashboard = () => {
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/patient/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch patient profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError("Error: Failed to fetch patient profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                HealthCare Portal
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link
                to="/qr-scanner"
                className="text-gray-600 hover:text-gray-900"
              >
                QR Scanner
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-red-500">{error}</p>
          </div>
        ) : profile ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome, {profile?.fullName}
            </h2>
            {/* Add more profile information here */}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p>Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
