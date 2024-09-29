import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getSingleProduct,
  getAllProducts,
  searchProduct,
  deleteProduct,
} from "../controllers/product.controller";
import {
  createProductValidator,
  updateProductValidator,
  getSingleProductValidator,
} from "../middlewares/validators/product.validator";

const router = Router();

router.post("/", createProductValidator, createProduct);
router.patch("/:id", updateProductValidator, updateProduct);
router.get("/:id", getSingleProductValidator, getSingleProduct);
router.get("/", getAllProducts);
router.get("/search", searchProduct);
router.delete("/:id", getSingleProductValidator, deleteProduct);

export default router;
