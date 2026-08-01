import {asyncHandler} from "../Utils/asyncHandler.js"
import {ApiError} from "../Utils/apiError.js"
import {User} from "../models/user.model.js"
import {cloudinaryUpload} from "../Utils/cloudinary.js"
import {ApiResponse}  from "../Utils/apiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
    const {username,fullname,email,password}=req.body;
    console.log(req.body);
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    if([username,fullname,email,password].some((fields)=>fields?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    const registeredUser=await User.findOne({
        $or:[{email},{username}]
    }
    )
    if(registeredUser){
        throw new ApiError(400,"User already exists");
    }

    const avatarLocalpath = req.files?.avatar[0]?.path;
    // const coverImageLocalpath = req.files?.coverImage[0]?.path;
    // we will check whether cover image is there or not if we dont check thn it will throw an error while file uploading 
    if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0){
        coverImageLocalpath=req.files.coverImage[0].path;
    }
    

    //if user has not put a avatar image so throw error as its a mandatory fields 
    if(!avatarLocalpath){
        throw new ApiError(409,"avatar file is required")
    }
    
    const avatar = await cloudinaryUpload(avatarLocalpath)
    const coverImage = await cloudinaryUpload(coverImageLocalpath)

    //if user has not put a avatar image so throw error as its a mandatory fields again checks if not uploaded 
    if(!avatar){
        throw new ApiError(409,"avatar file is required")
    }
    
    const user = await User.create({
        username:username.toLowerCase(),
        avatar:avatar.url,
        coverImage:coverImage?.url || "",// as this is not an mandatory so we chaeck whetherwe hAVe that or not 
        fullname,
        email,
        password
    })
    console.log("User created:", user);
    //we check data is enterd in db or not if the entry is in db we it will return us a id and we use select to hide some details 
    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
       throw new ApiError(500,"something went wrong while regestring the user")
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"user registerd successfully")
    )

    

})

export {registerUser}