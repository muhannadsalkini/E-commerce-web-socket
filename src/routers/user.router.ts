import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
  addAddress,
  updateAddress,
  getAddress,
  getAllAddresses,
  deleteAddress,
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

// Address
router.post("/address", auth, addAddress);
router.get("/address/:id", auth, getAddress);
router.get("/address/list", auth, getAllAddresses);
router.patch("/address/:id", auth, updateAddress);
router.delete("/address/:id", auth, deleteAddress);

export default router;
