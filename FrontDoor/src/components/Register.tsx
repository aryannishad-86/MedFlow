import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserRound,
  Mail,
  Lock,
  Phone,
  Building,
  Stethoscope,
} from "lucide-react";
import apiClient from "../api/client";
import { toast } from "react-hot-toast";

const Register = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    licenseNumber: "",
    hospitalClinic: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success("Registration successful!");
      navigate(type === "patient" ? "/patient" : "/doctor");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to connect to server");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2940')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="flex w-full max-w-4xl bg-white rounded-3xl overflow-hidden">
        {/* Left Side - Blue Section */}
        <div className="w-1/2 bg-[#3B82F6] p-8 text-white">
          <h1 className="text-3xl font-semibold mb-4">Healthcare Portal</h1>
          <p className="text-white/90 text-sm leading-relaxed mb-8">
            Join our innovative platform where healthcare meets technology,
            enabling seamless communication between patients and healthcare
            providers.
          </p>

          <div className="space-y-3">
            <div className="bg-white/10 p-4 rounded-2xl">
              <h3 className="font-medium">Secure Records</h3>
              <p className="text-sm text-white/80">
                Your health data, protected and accessible
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              <h3 className="font-medium">Expert Network</h3>
              <p className="text-sm text-white/80">
                Connect with healthcare professionals
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - White Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {type === "doctor" ? "Doctor Sign Up" : "Patient Sign Up"}
          </h2>
          <p className="text-gray-600 mb-8">
            Fill in your details to create your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            {type === "doctor" && (
              <>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Specialization"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="License Number"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
                    value={formData.licenseNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        licenseNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Hospital/Clinic"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500"
                    value={formData.hospitalClinic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hospitalClinic: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>

            <div className="flex justify-between text-sm mt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-blue-600"
              >
                ← Change Account Type
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800"
              >
                Go to Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
