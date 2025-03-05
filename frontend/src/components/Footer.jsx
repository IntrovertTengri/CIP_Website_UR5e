import RoboKidsLogo from "../assets/robokids-logo.svg";
import FacebookIcon from "../assets/facebook-icon.svg";
import TwitterIcon from "../assets/twitter-icon.svg";
import InstagramIcon from "../assets/instagram-icon.svg";

export default function Footer() {
	return (
		<footer className="flex bg-background gap-16 px-16 border-t-2 border-gray-300 py-5">
			{/* RoboKids Branding */}
			<div className="flex flex-col justify-between gap-3">
				<div className="flex items-center gap-1">
					<img src={RoboKidsLogo} alt="RoboKids Logo" />
					<h1 className="font-outfit font-bold text-3xl text-accent">
						RoboKids
					</h1>
				</div>
				{/* Social Media Icon Links */}
				<ul className="flex items-center gap-4">
					<li>
						<img src={FacebookIcon} alt="Facebook Icon" />
					</li>
					<li>
						<img src={InstagramIcon} alt="Instagram Icon" />
					</li>
					<li>
						<img src={TwitterIcon} alt="Twitter Icon" />
					</li>
				</ul>
			</div>

			<div className="flex flex-1/12 justify-around">
				<ul className="flex flex-col gap-1">
					<li>
						<h2 className="font-outfit font-semibold">Company</h2>
					</li>
					<li>
						<p className="font-outfit font-light">About Us</p>
					</li>
					<li>
						<p className="font-outfit font-light">Careers</p>
					</li>
					<li>
						<p className="font-outfit font-light">Press</p>
					</li>
					<li>
						<p className="font-outfit font-light">Blog</p>
					</li>
				</ul>

				<ul className="flex flex-col gap-1">
					<li>
						<h2 className="font-outfit font-semibold">Support</h2>
					</li>
					<li>
						<p className="font-outfit font-light">Help Center</p>
					</li>
					<li>
						<p className="font-outfit font-light">Contact Us</p>
					</li>
					<li>
						<p className="font-outfit font-light">API Documentation</p>
					</li>
					<li>
						<p className="font-outfit font-light">Community</p>
					</li>
				</ul>

				<ul className="flex flex-col gap-1">
					<li>
						<h2 className="font-outfit font-semibold">Legal</h2>
					</li>
					<li>
						<p className="font-outfit font-light">Terms of Service</p>
					</li>
					<li>
						<p className="font-outfit font-light">Privacy Policy</p>
					</li>
					<li>
						<p className="font-outfit font-light">Cookie Policy</p>
					</li>
				</ul>

				<ul className="flex flex-col gap-1">
					<li>
						<h2 className="font-outfit font-semibold">Follow Us</h2>
					</li>
					<li>
						<p className="font-outfit font-light">Twitter</p>
					</li>
					<li>
						<p className="font-outfit font-light">LinkedIn</p>
					</li>
					<li>
						<p className="font-outfit font-light">Facebook</p>
					</li>
					<li>
						<p className="font-outfit font-light">Instagram</p>
					</li>
				</ul>
			</div>
		</footer>
	);
}
