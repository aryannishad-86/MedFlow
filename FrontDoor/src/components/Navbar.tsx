import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              HealthCare Portal
            </Link>
          </div>

          {token && (
            <div className="flex items-center space-x-6">
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/scanner"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                QR Scanner
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
