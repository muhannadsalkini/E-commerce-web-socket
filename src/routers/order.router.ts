import express from "express";
import { auth } from "../middlewares/auth.middleware";
import {
  placeOrder,
  updateOrder,
  getUserOrders,
  getSingleOrder,
  deleteOrder,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/place", auth, placeOrder);
router.put("/:id", auth, updateOrder);
router.get("/", auth, getUserOrders);
router.get("/:id", auth, getSingleOrder);
router.delete("/:id", auth, deleteOrder);

export default router;
