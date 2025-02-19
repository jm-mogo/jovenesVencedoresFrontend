import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { User } from "../types";

export const useUser = (): Partial<User> | undefined => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      const decodedToken: Partial<User> = jwtDecode(token);

      return decodedToken;
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("jwtToken");
      navigate("/login");
    }
  } else {
    navigate("/login");
  }
};
