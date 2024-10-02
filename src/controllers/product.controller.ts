import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { Variant } from "../models/variant.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product found successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, brand, page = 1, limit = 20 } = req.query;

    const query: any = {};
    if (category) {
      query["category"] = category;
    }
    if (brand) {
      query["brand"] = brand;
    }

    // Get the total count of products that match the query
    const totalProducts = await Product.countDocuments(query);

    // Fetch the products with pagination
    const products = await Product.find(query)
      .limit(Number(limit)) // Limit the number of results
      .skip((Number(page) - 1) * Number(limit)); // Skip results based on the current page

    res.status(200).json({
      message: "Products found successfully",
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const { keyword, page = 1, limit = 20 } = req.query;

    if (!keyword) {
      return res
        .status(400)
        .json({ message: "Keyword is required for search." });
    }

    const searchQuery = { name: { $regex: keyword, $options: "i" } }; // Case-insensitive search

    const products = await Product.find(searchQuery)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const totalProducts = await Product.countDocuments(searchQuery); // Get total products matching the search

    res.status(200).json({
      message: "Products found successfully",
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Variant

// Create a new variant
export const createVariant = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const variantData = req.body;
    const newVariant = new Variant(variantData);
    const savedVariant = await newVariant.save();

    res
      .status(201)
      .json({ message: "Variant created successfully", savedVariant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all variants of a product
export const getAllVariants = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const variants = await Variant.find({ productId });
    if (!variants) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res.status(200).json({ message: "Variants found successfully", variants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single variant by ID
export const getVariantById = async (req: Request, res: Response) => {
  try {
    const variant = await Variant.findById(req.params.id);

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res.status(200).json({ message: "Variant found", variant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a variant by ID
export const updateVariant = async (req: Request, res: Response) => {
  try {
    const updatedVariant = await Variant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated variant
    );

    if (!updatedVariant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res
      .status(200)
      .json({ message: "Variant updated successfully", updatedVariant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a variant by ID
export const deleteVariant = async (req: Request, res: Response) => {
  try {
    const deletedVariant = await Variant.findByIdAndDelete(req.params.id);

    if (!deletedVariant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res.status(200).json({ message: "Variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
