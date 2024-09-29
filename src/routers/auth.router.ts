import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import {
  signupValidator,
  loginValidator,
} from "../middlewares/validators/auth.validator";

const router = Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/logout", logout);

export default router;
