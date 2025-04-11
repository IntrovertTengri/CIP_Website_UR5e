import RoboKidsLogo from "../assets/robokids-logo.svg";
import HeroRobot from "../assets/hero-robot.png";
import Footer from "../components/Footer";
import RealtimeControlCard from "../assets/realtime-control-card.svg";
import EasySetupCard from "../assets/easy-setup-card.svg";
import ComprehensiveMonitoringCard from "../assets/comprehensive-monitoring-card.svg";
import AdvancedSecurityCard from "../assets/advanced-security-card.svg";
import Header from "../components/Header";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";


// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";

function FeatureCard({ title, description, image }) {
  return (
    <div className="bg-background-card-primary rounded-lg w-full h-full p-7 pb-0 flex flex-col items-center justify-between">
      <div className="w-full">
        <h2 className="font-outfit font-semibold text-3xl text-primary-text">{title}</h2>
        <p className="font-outfit font-light text-xl">{description}</p>
      </div>

      <img src={image} />
    </div>
  );
}

function TestimonialCard({ profilePicture, name, position, review }) {
  return (
    <div className="bg-background-card-primary rounded-xl grid grid-rows-2 grid-cols-[auto_1fr] p-5 items-center gap-x-4 w-full">
      <img
        src={profilePicture}
        alt={name}
        className="rounded-full place-self-center"
      />

      <div>
        <p className="font-outfit font-semibold text-base">{name}</p>
        <p className="font-outfit font-light text-sm">{position}</p>
      </div>

      <div className="w-px h-5/6 bg-gray-400 place-self-center" />

      <p className="font-outfit font-normal text-lg">
        {review}
      </p>
    </div>
  );
}


export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <Header/>
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
        <div className="justify-self-center h-full w-3/5 px-15 py-5 flex flex-col items-center gap-5 border-2 border-gray-300 rounded-t-4xl bg-background-card-secondary border-b-transparent">
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
      <section className="py-15 w-full px-16 bg-background flex flex-col items-center gap-10">
        <h1 className="font-outfit font-semibold text-primary-text text-5xl">Why Choose RoboKids?</h1>

        {/* Features Cards */}
        <div className="grid grid-cols-2 grid-rows-2 w-full h-fit gap-5">
          <FeatureCard title="Real-Time Control" description="Instantly control your robots with real-time commands." image={RealtimeControlCard} />
          <FeatureCard title="Easy Setup" description="Get started in minutes with our user-friendly interface." image={EasySetupCard} />
          <FeatureCard title="Comprehensive Monitoring" description="Keep an eye on all your robots with our comprehensive monitoring tools." image={ComprehensiveMonitoringCard} />
          <FeatureCard title="Advanced Security" description="Your robots are safe with our advanced security protocols." image={AdvancedSecurityCard} />
        </div>
      </section>

      <section className="py-40 w-full px-16 bg-background flex justtify-between items-center gap-10">
        <h1 className="font-outfit font-semibold text-primary-text text-5xl w-1/2 self-start bg-background">Take Full Control</h1>
        <p className="font-outfit font-light text-2xl flex-1">
          With RoboKids, you have the power to manage and monitor your robots from anywhere in the world. Our platform is designed to be intuitive and powerful, ensuring you have the tools you need to succeed.
        </p>
      </section>

      <section className="w-full pb-40 px-16 bg-background flex flex-col justtify-center items-center gap-10">

        <h1 className="font-outfit font-semibold text-primary-text text-5xl">What Our Users Say</h1>
        {/* User Reviews Cards */}
        <div className="w-full overflow-x-auto no-scrollbar relative bg-background">    
          <ul className="flex gap-5 w-max bg-background">
            {Array.from({ length: 12 }).map((_, index) => (
              <li key={index} className="w-70 bg-background">
                <TestimonialCard
                  profilePicture={RoboKidsLogo}
                  name="Darian O'Neal"
                  position="Operations Manager, TechBots"
                  review="The real-time control features are unmatched. Highly recommend!"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}