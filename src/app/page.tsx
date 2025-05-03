import Hero from "@/components/home/hero";
import TargetAudience from "@/components/home/target-audience";
import KeyFeatures from "@/components/home/key-features";
import Navbar from "@/components/layout/navigation";
import OurVision from "@/components/home/vision";
import AccountSetup from "@/components/home/account-setup";
import React from "react";

const Home = () => {
	return (
		<React.Fragment>
			<Navbar />
			{/* Hero Section */}
			<Hero />
			<TargetAudience />
			{/* Key Features Section */}
			<KeyFeatures />
			{/* Our Vision Section */}
			<OurVision />
			{/* Account Setup Section */}
			<AccountSetup />
			{/* Call to Action Section */}
			{/* <CallToAction /> */}
			{/* Testimonials Section */}
			{/* <Testimonials /> */}
			{/* Blog Section */}
			{/* <Blog /> */}
			{/* FAQ Section */}
			{/* <FAQ /> */}
			{/* Contact Us Section */}
			{/* <ContactUs /> */}
			{/* Footer Section */}
		</React.Fragment>
	);
};

export default Home;
