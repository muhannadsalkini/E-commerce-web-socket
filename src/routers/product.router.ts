import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getSingleProduct,
  getAllProducts,
  searchProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.get("/:id", getSingleProduct);
router.get("/", getAllProducts);
router.get("/search", searchProduct);
router.delete("/:id", deleteProduct);

export default router;
