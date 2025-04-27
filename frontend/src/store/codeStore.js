import { create } from "zustand";
import axios from "axios";



const API_URL = import.meta.env.VITE_NODE_ENV == "development" 
? "http://localhost:8080/api" 
: import.meta.env.VITE_API_URL;


axios.defaults.withCredentials = true;

export const useCodeStore = create((set) => ({
	types: [],
	variants: [], 
	codes: [],
	message: null,

	// get all types 
	fetchTypes: async () => {
		try {
			const response = await axios.get(`${API_URL}/code/types`);
			set({ types: response.data.types});
		} catch (error) {
			set({ error: error.response.data.message || "Error fetchTypes"});
			throw error;
		}
	},

	// get all variants with the corresponding type (admin + user)
	fetchVariants: async (id) => {
		try {
			if (id == "admin") {
				const response = await axios.get(`${API_URL}/admin/variants/?id=${id}`);
				set({ types: response.data.type, variants: response.data.variants});
			} else {
				const response = await axios.get(`${API_URL}/code/variants/?id=${id}`);
				set({ types: response.data.type, variants: response.data.variants});
			}
		} catch (error) {
			set({ error: error.response.data.message || "Error fetchVariants"});
			throw error;
		}
	},

	// admin
	priceUpdate: async (variant_id, priceINR, priceUSDT) => {
		try {
			const response = await axios.post(`${API_URL}/admin/variants/priceUpdate`, {variant_id, priceINR, priceUSDT});
			set({ message: response.data.message });
		} catch (error) {
			set({ error: error.response.data.message || "Error priceUpdate"});
			throw error;
		}
	}
}));
