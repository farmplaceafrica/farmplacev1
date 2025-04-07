import Hero from "@/components/home/hero";
import Navbar from "@/components/layout/navigation";
import React from "react";

const Home = () => {
	return (
		<React.Fragment>
			<Navbar />
			{/* Hero Section */}
			<Hero />
		</React.Fragment>
	);
};

export default Home;
