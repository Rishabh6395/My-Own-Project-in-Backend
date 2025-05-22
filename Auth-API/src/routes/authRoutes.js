import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile);

export default router;
