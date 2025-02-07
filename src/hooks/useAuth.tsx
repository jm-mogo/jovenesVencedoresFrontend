import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAuth = (requiredRole: string) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.role === requiredRole) {
          setIsAuthorized(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, requiredRole]);

  return isAuthorized;
};
