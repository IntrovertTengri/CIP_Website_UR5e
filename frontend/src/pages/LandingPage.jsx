import RoboKidsLogo from "../assets/robokids-logo.svg";
import HeroRobot from "../assets/hero-robot.png";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section
        className="bg-linear-to-b from-35% to-55% to-background-gradientbg-linear-to-b from-background to-background-gradient
            h-[calc(100vh-4rem)] w-full px-16 grid grid-cols-1 grid-rows-[40%_60%] justify-center items-center"
      >
        {/* Hero Text */}
        <div className="h-full w-full flex flex-col justify-center items-center">
          <h1 className="text-primary-text font-outfit font-bold text-7xl lg:text-8xl text-center">
            Control Robots from Anywhere
          </h1>
          <button className="border border-accent rounded-lg px-5 py-2 mt-10 mb-5 bg-accent">
            <p className="text-background text-lg font-medium font-outfit">Continue</p>
          </button>
        </div>

        {/* Hero Card */}
        <div className="justify-self-center h-full w-3/5 px-15 py-5 flex flex-col items-center gap-5 border-2 border-gray-300 rounded-t-4xl bg-background border-b-transparent">
          {/* RoboKids Branding */}
          <div className="flex items-center py-3 gap-1">
            <img src={RoboKidsLogo} alt="RoboKids Logo" className="h-9" />
            <h1 className="font-outfit font-bold text-5xl text-accent">RoboKids</h1>
          </div>
          <img src={HeroRobot} alt="Hero Robot" className="rounded-2xl h-2/3" />
          <div className="w-2/3 h-10 bg-gray-200 rounded-lg shadow-sm"></div>
          <div className="w-1/2 h-10 bg-gray-200 rounded-lg shadow-sm"></div>
        </div>
      </section>

      {/* Wy Choose Section */}
      <section className="pt-16 h-screen w-full px-16 bg-background">
        <h1>Why Choose RoboKids?</h1>

        {/* Features Cards */}
        <div>

        </div>

        <div>
          <h1>Take Full Control</h1>
          <p>With RoboKids, you have the power to manage and monitor your robots from anywhere in the world. Our platform is designed to be intuitive and powerful, ensuring you have the tools you need to succeed.</p>
        </div>

        <div>
          <h1>What Our Users Say</h1>
          {/* User Reviews Cards */}
          <ul>

          </ul>
        </div>
      </section>
    </main>
  );
}