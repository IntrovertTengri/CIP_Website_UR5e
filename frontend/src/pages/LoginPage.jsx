import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/robots");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="pt-16 w-screen flex flex-1 flex-col items-center justify-center
              bg-linear-to-b from-1% to-50% to-background-gradientbg-linear-to-b from-background to-background-gradient"
    >
      <div className="w-full max-w-md p-8 bg-background rounded-2xl shadow-lg">
        <h1 className="text-4xl font-outfit font-bold text-accent mb-6 text-center">Welcome Back</h1>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            className="w-full font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="w-full font-outfit mt-4 py-2 bg-accent text-background rounded-lg font-medium">
            Log In
          </button>
        </form>
      </div>
      </main>
  );
}
