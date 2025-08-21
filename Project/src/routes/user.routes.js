import { Router } from "express";
import {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails,updateUserAvatar,updateUserCoverImage,getUserChannelProfile,getWatchHistory}  from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
// import { verify } from "jsonwebtoken";

const router = Router();

router.route("/register").post(
    upload.fields([
        {name: "avatar",
        maxCount: 1},
        {name : "coverImage",
        maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)
// router.route("/login").post(login)

// secured routes
router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("update-account").patch(verifyJWT,updateAccountDetails)

router.route("/change-avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/change-coverImage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)

router.route("/channel/:username").get(verifyJWT,getUserChannelProfile)

router.route("/watchHistory").get(verifyJWT,getWatchHistory)

export default router; // default is used so we can give a username in other files accoring to out wishes