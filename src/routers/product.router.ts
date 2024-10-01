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
} from "../middlewares/validators/product.validator";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

// variant
router.post("/variant", auth, createVariant);
router.get("/variant/list/:id", getAllVariants); // Get all variants of a product
router.get("/variant/:id", getVariantById);
router.patch("/variant/:id", auth, updateVariant);
router.delete("/variant/:id", auth, deleteVariant);

// product
router.post("/", auth, createProductValidator, createProduct);
router.patch("/:id", auth, updateProductValidator, updateProduct);
router.get("/list", getAllProducts);
router.get("/search", searchProduct);
router.get("/:id", getSingleProductValidator, getSingleProduct);
router.delete("/:id", auth, getSingleProductValidator, deleteProduct);

export default router;
