import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Shield, Network } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

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
              Welcome back! Sign in to access your healthcare dashboard and
              manage your medical records.
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

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-12 bg-gradient-to-br from-white to-blue-50">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h3>
          <p className="text-gray-600 mb-8 text-lg">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-violet-700 transition-all duration-300 font-medium text-lg shadow-lg shadow-blue-500/25"
            >
              Sign In
            </button>

            <div className="text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-600 font-semibold hover:text-blue-700 mt-1"
              >
                Create one here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
