import { useNavigate } from "react-router-dom";
import RoboKidsLogo from "../assets/robokids-logo.svg";
import { auth,onAuthStateChanged } from "../firebaseConfig";
import { useEffect } from "react";

export default function Header({ showOnlyLogo = false}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("User is signed out");
      }
    });
  },
  []);

  return (
    <header className="h-16 flex items-center bg-background gap-7 px-16 w-full">
      {/* RoboKids Branding */}
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
        <img src={RoboKidsLogo} alt="RoboKids Logo" />
        <h1 className="font-outfit font-bold text-3xl text-accent">RoboKids</h1>
      </div>

      {!showOnlyLogo && 
        (
          <>
            {/* Navigation Links */} 
            <ul className="flex items-center gap-7">
              <li className="cursor-pointer" onClick={() => navigate("/")}>
                <p className="font-outfit font-medium text-base text-primary-text">Home</p>
              </li>
              <li>
                <p className="font-outfit font-medium text-base text-primary-text">How to connect</p>
              </li>
              <li className="cursor-pointer" onClick={() => navigate("/robots")}>
                <p className="font-outfit font-medium text-base text-primary-text">Our robots</p>
              </li>
              <li>
                <p className="font-outfit font-medium text-base text-primary-text">Contact</p>
              </li>
            </ul>

            <div className="flex items-center ml-auto gap-7">
              <button onClick={() => navigate("/login")}>
                <p className="text-primary-text font-medium text-base font-outfit">Log in</p>
              </button>
              <button 
                onClick={() => navigate("/signup")}
                className="border border-accent rounded-lg px-5 py-2 bg-accent"
              >
                <p className="text-background text-base font-medium font-outfit">Sign up</p>
              </button>
            </div>
          </>  
        )
      }

    </header>
  );
}
