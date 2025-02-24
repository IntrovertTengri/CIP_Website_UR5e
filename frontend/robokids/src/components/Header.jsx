import RoboKidsLogo from "../assets/robokids-logo.svg";

export default function Header() {
  return (
    <header className="w-full flex items-center bg-background gap-4 mt-3 px-16">
        {/* RoboKids Branding */}
        <div className="flex items-center gap-1">
            <img src={RoboKidsLogo} alt="RoboKids Logo" />
            <h1 className="font-outfit font-bold text-3xl text-accent">RoboKids</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-4">
            <li>
                <p className="font-outfit font-medium text-base text-primary-text">Home</p>
            </li>
            <li>
                <p className="font-outfit font-medium text-base text-primary-text">How to connect</p>
            </li>
            <li>
                <p className="font-outfit font-medium text-base text-primary-text">Our robots</p>
            </li>
            <li>
                <p className="font-outfit font-medium text-base text-primary-text">Contact</p>
            </li>
        </ul>

        <div className="flex items-center ml-auto gap-4">
            <button className="">
                <p className="text-primary-text font-medium text-base font-outfit">Log in</p>
            </button>
            <button className="border border-accent rounded-lg px-5 py-2 bg-accent">
                <p className="text-background text-base font-medium font-outfit">Sign up</p>
            </button>
        </div>
    </header>
  );
}