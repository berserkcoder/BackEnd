import { Router } from "express";
import { loginUser, registerUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

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

export default router; // default is used so we can give a username in other files accoring to out wishes