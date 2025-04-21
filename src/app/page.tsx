import Hero from "@/components/home/hero";
import TargetAudience from "@/components/home/target-audience";
import KeyFeatures from "@/components/home/key-features";
import Navbar from "@/components/layout/navigation";
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
		</React.Fragment>
	);
};

export default Home;
