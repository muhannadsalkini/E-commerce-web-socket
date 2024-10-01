import { Router } from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller";
import {
  signupValidator,
  loginValidator,
} from "../middlewares/validators/auth.validator";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/logout", logout);
router.get("/me", auth, getCurrentUser);

export default router;
