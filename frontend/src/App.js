import Components from './Components/Components';
import React, {useState} from "react";
function App() {
  const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Parse the stored JSON, or return null if no user is found
  };

  const [user, setUser] = useState(loadUserFromLocalStorage); // Initialize state with loaded user
  const port = 5075
  const host = "db8.cse.nd.edu"
  const handleLogin = async (dataToSend) => {
    try {
      const response = await fetch(`http://${host}:${port}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
  
      const result = await response.json();
  
      console.log("Login result:", result); // Log the result
  
      if (result.status === "success" && result.message) {
        
        const { username, address, user_id } = result.message;

        const loggedInUser = { username, address, userId: user_id };
        setUser(loggedInUser); // Update state with logged in user
        localStorage.setItem('user', JSON.stringify(loggedInUser)); // Save user to localStorage
        return { status: "success" }; // Indicate success
      } else {
        return { status: "error", message: result.message || "Invalid login" };
      }
    } catch (error) {
      console.error("Error in handleLogin:", error);
      return { status: "error", message: "Login failed" };
    }
  };
  
  const handleRegister = async (dataToSend) => {
    try {
      const response = await fetch(`http://${host}:${port}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
  
      const result = await response.json();
  
      console.log("Register result:", result); // Log the result
  
      if (result.status === "success" && result.message) {
        const username = dataToSend["username"]
        const address = dataToSend["address"]
        const loggedInUser = { username, address };
        setUser(loggedInUser); // Update state with logged in user
        localStorage.setItem('user', JSON.stringify(loggedInUser)); // Save user to localStorage
        return { status: "success" }; // Indicate success
      } else {
        return { status: "error", message: result.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Error in handleRegister:", error);
      return { status: "error", message: "Registration failed" };
    }
  };
  
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem('user'); // Remove user from localStorage

  }


  return (
  <Components 
    login={handleLogin} 
    register={handleRegister}
    logout={handleLogout}
    user={user}
    setUser={setUser}
    host={host}
    port={port} />
  );
}
export default App;
