import React from "react";
import { useNavigate } from "react-router-dom";
const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove JWT token from local storage or cookies
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };
  // Redirect to login page or home page

  return (
    <button onClick={handleLogout} className="text-red-400">
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
