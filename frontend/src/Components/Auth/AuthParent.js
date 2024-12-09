import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthChild from "./AuthChild.js";

export default function AuthParent({ onLogin, onRegister }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    address: "", // This will be used only for registration
  });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    
    try {
      if (!credentials.username || !credentials.password) {
        throw new Error("Username and password are required");
      }
      
      // Only add address to the user data if it's a registration
      const user = {
        username: credentials.username,
        password: credentials.password,
        ...(isLogin ? {} : { address: credentials.address }), // Add address only for registration
        method: isLogin ? "login" : "register",
      };
      
      const result = isLogin ? await onLogin(user) : await onRegister(user);
      console.log(result);

      if (result && result.status === "success") {
        // Navigate only on successful login or registration
        console.log("Navigating to dashboard");
        navigate("/");
      } else {
        // Handle failure (e.g., invalid credentials)
        throw new Error(result?.message || "Failed to log in or register");
      }
    } catch (error) {
      setError(error.message);
      console.error(isLogin ? "Login failed:" : "Registration failed:", error);
    }
  };

  return (
    <AuthChild
      credentials={credentials}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      error={error}
    />
  );
}
