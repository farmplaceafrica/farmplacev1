import Hero from "@/components/home/hero";
import TargetAudience from "@/components/home/target-audience";
import Navbar from "@/components/layout/navigation";
import React from "react";

const Home = () => {
	return (
		<React.Fragment>
			<Navbar />
			{/* Hero Section */}
			<Hero />
			<TargetAudience />
		</React.Fragment>
	);
};

export default Home;
