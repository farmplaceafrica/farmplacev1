import axios from "axios";
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

// Cache variables
let cachedRate: number | null = null;
let lastFetched: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CoinGeckoResponse {
	cardano: {
		usd: number;
	};
}

interface ExchangeRateAPIResponse {
	rates: {
		USD: number;
	};
}

/**
 * Gets the NGN → ADA rate using exchangerate-api + CoinGecko.
 */
const getNGNtoADARate = async (): Promise<number> => {
	const now = Date.now();
	if (
		cachedRate !== null &&
		lastFetched !== null &&
		now - lastFetched < CACHE_DURATION
	) {
		return cachedRate;
	}

	try {
		// Get ADA/USD from CoinGecko
		const { data: adaData } = await axios.get<CoinGeckoResponse>(
			"https://api.coingecko.com/api/v3/simple/price",
			{
				params: {
					ids: "cardano",
					vs_currencies: "usd",
				},
			}
		);
		const adaUsd = adaData.cardano.usd;

		// Get NGN/USD from ExchangeRate API (no key required)
		const { data: forexData } = await axios.get<ExchangeRateAPIResponse>(
			"https://open.er-api.com/v6/latest/NGN"
		);
		const ngnUsd = forexData.rates.USD;

		const ngnToAda = ngnUsd / adaUsd;
		cachedRate = ngnToAda;
		lastFetched = now;

		return ngnToAda;
	} catch (error: any) {
		console.error("Error fetching exchange rate:", error.message);
		throw new Error("Failed to get NGN to ADA rate.");
	}
};

/**
 * Converts Naira (NGN) amount to ADA
 */
export const convertNGNtoADA = async (amountNGN: number): Promise<number> => {
	const rate = await getNGNtoADARate();
	const adaValue = amountNGN * rate;
	return parseFloat(adaValue.toFixed(6));
};
