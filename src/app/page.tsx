import Hero from "@/components/home/hero";
import TargetAudience from "@/components/home/target-audience";
import KeyFeatures from "@/components/home/key-features";
import Navbar from "@/components/layout/navigation";
import FAQAndCTA from "@/components/home/faq";
import AccountSetup from "@/components/home/account-setup";
import Footer from "@/components/layout/footer";
import React from "react";
import FeaturedProducts from "@/components/home/featured-product";

const Home = () => {
	return (
		<React.Fragment>
			<Navbar />
			<Hero />
			<TargetAudience />
			<KeyFeatures />
			<FeaturedProducts />
			<AccountSetup />

			<FAQAndCTA />
			<Footer />
		</React.Fragment>
	);
};

export default Home;
