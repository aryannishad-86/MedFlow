
import { useNavigate } from "react-router-dom";

interface CreateAccountButtonProps {
  userType: "patient" | "doctor" | null;
  formData: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    specialization?: string;
    licenseNumber?: string;
    hospital?: string;
  };
}

const CreateAccountButton = ({
  userType,
  formData,
}: CreateAccountButtonProps) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log("Attempting registration with data:", {
        ...formData,
        role: userType,
      });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role: userType,
        }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        // Store the token
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Token stored successfully");
        }

        // Navigate based on user type
        if (userType === "patient") {
          console.log("Navigating to patient dashboard");
          navigate("/patient");
        } else if (userType === "doctor") {
          console.log("Navigating to doctor dashboard");
          navigate("/doctor");
        }
      } else {
        console.error("Registration failed:", data.error);
        alert(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Detailed error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-violet-700 transition-all duration-300 font-medium text-lg shadow-lg shadow-blue-500/25"
    >
      Create Account
    </button>
  );
};

export default CreateAccountButton;
