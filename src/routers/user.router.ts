import { Router } from "express";
import {
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/list", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
