import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getSingleProduct,
  getAllProducts,
  searchProduct,
  deleteProduct,
  createVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
} from "../controllers/product.controller";
import {
  createProductValidator,
  updateProductValidator,
  getSingleProductValidator,
  createVariantValidator,
  updateVariantValidator,
  getVariantValidator,
} from "../middlewares/validators/product.validator";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

// variant
router.post("/variant", auth, createVariantValidator, createVariant);
router.get("/variant/list/:id", getVariantValidator, getAllVariants); // Get all variants of a product
router.get("/variant/:id", getVariantValidator, getVariantById);
router.patch("/variant/:id", auth, updateVariantValidator, updateVariant);
router.delete("/variant/:id", auth, getVariantValidator, deleteVariant);

// product
router.post("/", auth, createProductValidator, createProduct);
router.patch("/:id", auth, updateProductValidator, updateProduct);
router.get("/list", getAllProducts);
router.get("/search", searchProduct);
router.get("/:id", getSingleProductValidator, getSingleProduct);
router.delete("/:id", auth, getSingleProductValidator, deleteProduct);

export default router;
