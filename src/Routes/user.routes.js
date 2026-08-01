import { Router } from "express";
import { registerUser } from "../Controller/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";

const router=Router();

router.route("/register").post(
//import multer and use that here as middleware and we are usin it bcz of file handling and hence we used fields so that we can take multiple file here
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1

        }
    ]),


    registerUser
);

export default router;