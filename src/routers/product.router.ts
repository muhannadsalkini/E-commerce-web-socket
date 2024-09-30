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
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", auth, createProductValidator, createProduct);
router.patch("/:id", auth, updateProductValidator, updateProduct);
router.get("/list", getAllProducts);
router.get("/search", searchProduct);
router.get("/:id", getSingleProductValidator, getSingleProduct);
router.delete("/:id", auth, getSingleProductValidator, deleteProduct);

export default router;
