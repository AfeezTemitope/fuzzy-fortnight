import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const data = await response.json();

            if (data.success) {
                set((state) => ({
                    products: [...state.products, newProduct],
                }));
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Error in createProduct:', error);
            return { success: false, message: 'Failed to create product' };
        }
    },
    fetchProducts: async () => {
        const res = await fetch(`http://localhost:5000/api/view`)
        const data = await res.json()
        set({products:data.data})
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`http://localhost:5000/api/${pid}`,{
            method: "DELETE",
        })
        const data = await res.json()
        if(!data.success) return {success: false, message: data.message}
        set(state => ({products: state.products.filter(product => product._id !== pid)}) )
        return { success: true, message: data.message}
    }
}));