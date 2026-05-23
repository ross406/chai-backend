import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// http://localhost:8000/api/v1/users/register
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
// http://localhost:8000/api/v1/users/login
router.route("/login").post(loginUser);

// secured route - only accessible with valid access token
// http://localhost:8000/api/v1/users/logout
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
