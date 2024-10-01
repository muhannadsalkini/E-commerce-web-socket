import { Router } from "express";
import {
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller";
import {
  validateCreateUser,
  validateUpdateUser,
  validateGetUserById,
} from "../middlewares/validators/user.validator";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", auth, validateCreateUser, getAllUsers);
router.get("/list", getAllUsers);
router.get("/:id", validateGetUserById, getUserById);
router.patch("/:id", validateUpdateUser, updateUser);
router.delete("/:id", validateGetUserById, deleteUser);

export default router;
