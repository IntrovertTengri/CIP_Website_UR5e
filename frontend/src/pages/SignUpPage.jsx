import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
    //if (!username || !school) {
      setError("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
  e.preventDefault(); // ✅ stops full-page reload
  if (!validateForm()) return;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

      // At this point, user is created in Firebase Auth
      // Optionally: Save extra info to Firestore or Realtime DB here

    alert("Registration successful!");
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
        <h1 className="text-4xl font-outfit font-bold text-accent mb-6 text-center">Join RoboKids</h1>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          {/* <input
            className="w-full font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}

          <input
            className="w-full font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* <input
            className="w-full font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
            type="text"
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          /> */}

          <input
            className="w-full font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="w-full font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type ="submit"
            className="w-full font-outfit mt-4 py-2 bg-accent text-background rounded-lg font-medium"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
