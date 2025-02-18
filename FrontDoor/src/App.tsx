import React, { useState } from "react";
import {
  UserRound,
  Stethoscope,
  ChevronRight,
  Mail,
  Lock,
  User,
  Phone,
  Building,
} from "lucide-react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import ProfileSettings from "./components/ProfileSettings";
import QRCodeScanner from "./components/QRCodeScanner";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import CreateAccountButton from "./components/CreateAccountButton";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";

function App() {
  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    licenseNumber: "",
    hospital: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allFields = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {}
    );
    setTouchedFields(allFields);

    if (
      e.currentTarget instanceof HTMLFormElement &&
      e.currentTarget.checkValidity()
    ) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            role: userType,
            hospitalClinic: formData.hospital,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          if (userType === "patient") {
            navigate("/patient");
          } else if (userType === "doctor") {
            navigate("/doctor");
          }
        } else {
          console.error("Registration failed:", data.error);
          alert(data.error || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClasses =
      "w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-200";
    const validClasses =
      "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
    const invalidClasses =
      "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100";

    const isInvalid =
      touchedFields[fieldName] && !formData[fieldName as keyof typeof formData];
    return `${baseClasses} ${isInvalid ? invalidClasses : validClasses}`;
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register/:type" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/qr-scanner" element={<QRCodeScanner />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
