import { useNavigate } from "react-router-dom";
import RoboKidsLogo from "../assets/robokids-logo.svg";
import { useAuth } from "../AuthContext"; // 🔁 use your context instead

export default function Header({ showOnlyLogo = false }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 🔥 now getting user & logout from context

  const handleLogout = async () => {
    try {
      await logout(); // calls signOut internally via AuthContext
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="h-16 flex items-center bg-background gap-7 px-16 w-full">
      {/* RoboKids Branding */}
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
        <img src={RoboKidsLogo || "/placeholder.svg"} alt="RoboKids Logo" />
        <h1 className="font-outfit font-bold text-3xl text-accent">RoboKids</h1>
      </div>

      {!showOnlyLogo && (
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
            {user ? (
              // User is logged in
              <>
                <button onClick={() => navigate("/robots?openBooking=true")} className="border border-accent rounded-lg px-5 py-2">
                  <p className="text-accent text-base font-medium font-outfit">Book the Robot</p>
                </button>
                <button onClick={handleLogout} className="border border-accent rounded-lg px-5 py-2 bg-accent">
                  <p className="text-background text-base font-medium font-outfit">Log out</p>
                </button>
              </>
            ) : (
              // User is not logged in
              <>
                <button onClick={() => navigate("/login")}>
                  <p className="text-primary-text font-medium text-base font-outfit">Log in</p>
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="border border-accent rounded-lg px-5 py-2 bg-accent"
                >
                  <p className="text-background text-base font-medium font-outfit">Sign up</p>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
}
