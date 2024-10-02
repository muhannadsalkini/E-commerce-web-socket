import express from "express";
import { auth } from "../middlewares/auth.middleware";
import {
  placeOrder,
  updateOrder,
  getUserOrders,
  getSingleOrder,
  deleteOrder,
} from "../controllers/order.controller";

import {
  placeOrderValidator,
  updateOrderValidator,
  getSingleOrderValidator,
} from "../middlewares/validators/order.validator";

const router = express.Router();

router.post("/place", auth, placeOrderValidator, placeOrder);
router.patch("/:id", auth, updateOrderValidator, updateOrder);
router.get("/list", auth, getUserOrders);
router.get("/:id", auth, getSingleOrderValidator, getSingleOrder);
router.delete("/:id", auth, getSingleOrderValidator, deleteOrder);

export default router;
