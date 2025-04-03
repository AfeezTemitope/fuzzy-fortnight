import Product from "../models/ProductModel.js";

const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//delete

const deleteProduct = async (req,res)=>{
    const{ id } = req.params;
    try{
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){ return res.status(404).json({success: false, message:"product not found"})}
        res.status(200).json({success:true, message:"products deleted"})
    }catch (e) {
        console.error("error deleting product", error.message)
        res.status(404).json({success:false, message: "products not found"})
    }
}

//update
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!updates.name && !updates.price && !updates.image) {
        return res.status(400).json({ success: false, message: "Provide at least one field to update" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//read

const readProduct = async (req, res) => {

    try {
        const product = await Product.find({});
        if (!product) {
            return res.status(404).json({ success: false, message: "no product in the db" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error reading product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export default { createProduct, deleteProduct, readProduct, updateProduct };