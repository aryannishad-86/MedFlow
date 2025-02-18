import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

const DoctorOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialties: [],
    education: [],
    experience: [],
    availability: [],
    consultationFee: "",
  });

  const handleSubmit = async () => {
    try {
      await apiClient.post("/doctor/profile", formData);
      navigate("/doctor/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>

          {/* Progress indicator */}
          <div className="flex mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full mx-1 ${
                  step >= i ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">
                Professional Information
              </h3>
              {/* Add your form fields here */}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOnboarding;
