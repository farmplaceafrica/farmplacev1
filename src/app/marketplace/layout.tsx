import DashboardNavbar from "@/components/marketplace/layout/navbar";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/components/context/CardContext";
const MarketplaceLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<CartProvider>
			<div className='flex flex-col'>
				{/* Toast Notifications */}
				<Toaster
					position='top-right'
					reverseOrder={false}
					toastOptions={{
						className: "",
						duration: 5000,
						style: {
							background: "#363636",
							color: "#fff",
						},
					}}
				/>
				{/* Dashboard Navbar */}
				<DashboardNavbar />
				{/* Main Content */}
				<div className='flex flex-col mt-20'>{children}</div>
			</div>
		</CartProvider>
	);
};
export default MarketplaceLayout;
