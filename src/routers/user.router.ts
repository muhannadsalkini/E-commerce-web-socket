import { Router } from "express";
import {
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
  createUser,
} from "../controllers/user.controller";
import {
  validateCreateUser,
  validateUpdateUser,
  validateGetUserById,
} from "../middlewares/validators/user.validator";
import { auth, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", auth, isAdmin, validateCreateUser, createUser);
router.get("/list", isAdmin, getAllUsers);
router.get("/:id", validateGetUserById, getUserById);
router.patch("/:id", auth, validateUpdateUser, updateUser);
router.delete("/:id", auth, isAdmin, validateGetUserById, deleteUser);

export default router;
