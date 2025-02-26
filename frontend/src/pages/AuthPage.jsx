import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthPage({ isSignUp = false }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleAuth(e) {
        e.preventDefault();

        if (!email || !password) {
            console.error("Email and password cannot be empty.");
            return;
        }

        console.log("Email:", email);
        console.log("Password:", password);

        if (isSignUp) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Successfully signed up:", userCredential.user);
                    navigate("/robots");
                })
                .catch((error) => {
                    console.error(error.code, error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Successfully signed in:", userCredential.user);
                    navigate("/robots");
                })
                .catch((error) => {
                    console.error(error.code, error.message);
                });
        }
    }

    return (
        <main className="pt-16 w-screen h-screen flex flex-col items-center justify-center bg-linear-to-b from-background from-15% to-45% to-background-gradient">
            <div className="w-full max-w-md p-8 bg-background rounded-2xl shadow-lg">
                <h1 className="text-4xl font-outfit font-bold text-accent mb-6 text-center">
                    RoboKids
                </h1>
                {/* Form Fields */}
                <form className="flex flex-col gap-4" onSubmit={handleAuth}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="font-outfit px-4 py-2 border rounded-lg bg-white focus:outline-none"
                    />
                    <button 
                        type="submit"
                        className="font-outfit mt-4 py-2 bg-accent text-background rounded-lg font-medium"
                        disabled={!email || !password}
                    >
                        {isSignUp ? "Sign Up" : "Log In"}
                    </button>
                </form>
            </div>
        </main>
    );
}
