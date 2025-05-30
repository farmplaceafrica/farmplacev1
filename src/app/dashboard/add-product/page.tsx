"use client";

import ProductForm from "@/components/dashboard/product-upload";
import { useEffect, useState } from "react";

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
	quantity: number;
	priceNGN: string;
	mainImage: ProductImage | null;
	additionalImages: ProductImage[];
};

const API_BASE_URL = "https://farmplace-backend-api.onrender.com/api/v1";

const Page = () => {
	const [initialData, setInitialData] = useState<
		Partial<ProductFormData> | undefined
	>(undefined);

	// Load draft data from localStorage on component mount
	useEffect(() => {
		const loadDraftData = () => {
			try {
				const draftData = localStorage.getItem("productFormDraft");
				if (draftData) {
					const parsedData: ProductFormData = JSON.parse(draftData);
					// Note: We can't restore file previews from localStorage, so we only restore text fields
					setInitialData({
						productName: parsedData.productName,
						category: parsedData.category,
						description: parsedData.description,
						location: parsedData.location,
						quantity: parsedData.quantity || 1,
						priceNGN: parsedData.priceNGN,
						// Images will need to be re-uploaded
						mainImage: null,
						additionalImages: [],
					});
					console.log("Loaded draft data:", parsedData);
				}
			} catch (error) {
				console.error("Error loading draft data:", error);
				// Clear corrupted data
				localStorage.removeItem("productFormDraft");
			}
		};

		loadDraftData();
	}, []);

	const handleSubmit = async (data: ProductFormData) => {
		try {
			// Create FormData object for multipart/form-data
			const formData = new FormData();

			// Append text fields
			formData.append("productName", data.productName);
			formData.append("category", data.category);
			formData.append("description", data.description);
			formData.append("location", data.location);
			formData.append("quantity", data.quantity.toString());
			formData.append("priceNGN", data.priceNGN);

			// Combine all images into a single array
			// Main image goes first, followed by additional images
			const allImages: File[] = [];

			if (data.mainImage) {
				allImages.push(data.mainImage.file);
			}

			data.additionalImages.forEach((img) => {
				allImages.push(img.file);
			});

			// Append all images to the images array field
			allImages.forEach((imageFile, index) => {
				formData.append("images", imageFile);
			});

			// Alternative approach if your API expects numbered fields:
			// allImages.forEach((imageFile, index) => {
			// 	formData.append(`images[${index}]`, imageFile);
			// });

			// Get auth token if available (adjust based on your auth implementation)
			const token =
				localStorage.getItem("auth_token") ||
				sessionStorage.getItem("auth_token");

			const headers: HeadersInit = {};
			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			// Send API request
			const response = await fetch(`${API_BASE_URL}/product`, {
				method: "POST",
				headers,
				body: formData,
			});

			if (!response.ok) {
				console.error(
					`HTTP error! status: ${response.status}, message: ${response.statusText}`
				);
				console.log("Response headers:", response.headers);
				// Attempt to parse error response
				// This is useful if your API returns a JSON error response

				const errorData = await response.json().catch(() => null);

				throw new Error(
					errorData?.message || `HTTP error! status: ${response.status}`
				);
			}

			const result = await response.json();
			console.log("Product uploaded successfully:", result);

			// Clear draft data on successful upload
			localStorage.removeItem("productFormDraft");

			// Show success message (this will be handled by the ProductForm component's toast)
			// You could also redirect to products page or show a success modal here

			return result;
		} catch (error) {
			console.error("Error uploading product:", error);

			// Re-throw the error so the ProductForm component can handle it and show error toast
			throw new Error(
				error instanceof Error
					? error.message
					: "Failed to upload product. Please try again."
			);
		}
	};

	const handleSaveDraft = (data: ProductFormData) => {
		try {
			// Only save text data to localStorage (can't save File objects)
			const draftData = {
				productName: data.productName,
				category: data.category,
				description: data.description,
				location: data.location,
				quantity: data.quantity,
				priceNGN: data.priceNGN,
				// Note: Images are not saved in draft
			};

			const draftDataString = JSON.stringify(draftData);
			localStorage.setItem("productFormDraft", draftDataString);

			console.log("Draft saved successfully");
		} catch (error) {
			console.error("Error saving draft:", error);
			throw new Error("Failed to save draft. Please try again.");
		}
	};

	return (
		<div>
			<ProductForm
				onSubmit={handleSubmit}
				onSaveDraft={handleSaveDraft}
				initialData={initialData}
				categories={[
					"Grains",
					"Vegetables",
					"Fruits",
					"Dairy",
					"Meat",
					"Spices",
					"Legumes",
					"Tubers",
					"Herbs",
					"Beverages",
				]}
				locations={[
					"Calabar",
					"Lagos",
					"Abuja",
					"Kano",
					"Port Harcourt",
					"Ibadan",
					"Kaduna",
					"Jos",
					"Enugu",
					"Owerri",
				]}
			/>
		</div>
	);
};

export default Page;
