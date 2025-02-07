import React from "react";
import { Button } from "flowbite-react";
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
    <Button onClick={handleLogout} color="red">
      Log Out
    </Button>
  );
};

export default LogoutButton;
