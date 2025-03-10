import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      alert("Login successful!");
      navigate("/robots"); 
    } else {
      alert("Login failed: " + data.detail);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <input
        className="w-full p-2 border rounded mb-4"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">
        Log In
      </button>
    </div>
  );
}
