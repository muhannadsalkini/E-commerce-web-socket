import { Router } from "express";
import authRouter from "./auth.router";
import productRouter from "./product.router";
import userRouter from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);

export default router;
