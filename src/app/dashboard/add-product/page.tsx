"use client";

import ProductForm from "@/components/dashboard/product-upload";
import { useEffect } from "react";
interface ProductImage {
	file: File;
	preview: string;
	id: string;
}
type ProductFormData = {
	productName: string;
	category: string;
	description: string;
	location: string;
	priceNGN: string;
	priceADA: string;
	mainImage: ProductImage | null;
	additionalImages: ProductImage[];
};

const Page = () => {
	// In your parent component
	const handleSubmit = async (data: ProductFormData) => {
		const formData = new FormData();
		formData.append("productName", data.productName);
		formData.append("category", data.category);
		// ... other fields

		if (data.mainImage) {
			formData.append("mainImage", data.mainImage.file);
		}

		data.additionalImages.forEach((img: { file: File }, index: number) => {
			formData.append(`additionalImage${index}`, img.file);
		});

		// Send to your API
		await fetch("/api/products", {
			method: "POST",
			body: formData,
		});
	};
	const handleSaveDraft = (data: ProductFormData) => {
		try {
			// Convert the product form data to a JSON string
			const draftData = JSON.stringify(data);

			// Save the draft data in localStorage
			localStorage.setItem("productFormDraft", draftData);

			// Notify the user that the draft has been saved
			alert("Draft saved successfully!");
		} catch (error) {
			// Handle potential errors
			console.error("Error saving draft:", error);
			alert("Failed to save draft. Please try again.");
		}
	};

	useEffect(() => {
		// Check for existing draft data
		const draftData = localStorage.getItem("productFormDraft");

		if (draftData) {
			try {
				// Parse the draft data and prefill the form
				const parsedData: ProductFormData = JSON.parse(draftData);

				// Prefill the form using the parsed draft data
				console.log("Loaded draft data:", parsedData);
				// You might need to pass this to the ProductForm component
			} catch (error) {
				console.error("Error loading draft data:", error);
			}
		}
	}, []);

	return (
		<div>
			<ProductForm
				onSubmit={handleSubmit}
				onSaveDraft={handleSaveDraft}
				categories={["Grains", "Vegetables", "Fruits"]}
				locations={["Calabar", "Lagos", "Abuja"]}
			/>
		</div>
	);
};

export default Page;
