import { Router } from "express";
import {
  changeCurrentUserPassword,
  getCurrentUserDetails,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
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

// http://localhost:8000/api/v1/users/refresh-token
router.route("/refresh-token").post(refreshAccessToken);

router.route("/current-user").get(verifyJWT, getCurrentUserDetails);

router.route("/change-password").post(verifyJWT, changeCurrentUserPassword);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

router.route("/watch-history").get(verifyJWT, getWatchHistory);

export default router;
