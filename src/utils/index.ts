import { Transaction } from "@meshsdk/core";

export const createSingleVendorTransaction = (cart: any[], wallet: any) => {
	const tx = new Transaction({ initiator: wallet });

	const totalAda = cart.reduce((sum, item) => sum + item.priceAda, 0);
	const vendorAddress = cart[0].vendorAddress;

	tx.sendLovelace(vendorAddress, (totalAda * 1_000_000).toString());

	tx.setMetadata(1001, {
		type: "single-vendor",
		vendor: vendorAddress,
		totalAda,
		products: cart.map((item) => ({
			id: item.id,
			name: item.name,
			priceAda: item.priceAda,
		})),
		timestamp: Date.now(),
	});

	return tx;
};

export const createMultiVendorTransaction = (cart: any[], wallet: any) => {
	const tx = new Transaction({ initiator: wallet });

	const grouped = new Map<string, number>();
	for (const product of cart) {
		const amount = grouped.get(product.vendorAddress) || 0;
		grouped.set(product.vendorAddress, amount + product.priceAda);
	}

	for (const [vendor, amountAda] of grouped.entries()) {
		tx.sendLovelace(vendor, (amountAda * 1_000_000).toString());
	}

	tx.setMetadata(1002, {
		type: "multi-vendor",
		distribution: Array.from(grouped.entries()).map(([vendor, ada]) => ({
			vendor,
			totalAda: ada,
		})),
		products: cart.map((item) => ({
			id: item.id,
			name: item.name,
			priceAda: item.priceAda,
			vendor: item.vendorAddress,
		})),
		timestamp: Date.now(),
	});

	return tx;
};
