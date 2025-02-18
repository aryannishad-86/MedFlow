import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Stethoscope,
  ChevronRight,
  Shield,
  Network,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2940')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-[2px]" />

      <div className="flex w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl relative mx-4 z-10">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-800 p-12 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Healthcare Portal
            </h2>
            <p className="mb-8 text-blue-100 text-lg leading-relaxed">
              Join our innovative platform where healthcare meets technology,
              enabling seamless communication between patients and healthcare
              providers.
            </p>

            <div className="space-y-4">
              <div className="bg-white/10 p-6 rounded-2xl flex items-start space-x-4 hover:bg-white/20 transition-all cursor-pointer group">
                <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Records</h3>
                  <p className="text-blue-100">
                    Your health data, protected and accessible
                  </p>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-2xl flex items-start space-x-4 hover:bg-white/20 transition-all cursor-pointer group">
                <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expert Network</h3>
                  <p className="text-blue-100">
                    Connect with healthcare professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-12 bg-gradient-to-br from-white to-blue-50">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Choose your account type to get started
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/register/patient")}
              className="w-full flex items-center justify-between p-6 rounded-2xl bg-white border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <UserRound className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800 block text-lg">
                    Patient Account
                  </span>
                  <span className="text-gray-500">
                    Access your health records
                  </span>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => navigate("/register/doctor")}
              className="w-full flex items-center justify-between p-6 rounded-2xl bg-white border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800 block text-lg">
                    Doctor Account
                  </span>
                  <span className="text-gray-500">Manage your practice</span>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500">Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:text-blue-700 mt-1"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
