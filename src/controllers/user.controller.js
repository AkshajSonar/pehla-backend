import { asyncHandler } from "../utils/asynchandler.js";
import {apiError} from "../utils/apiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import ApiResponse from "../utils/apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    //validation
    // check if user already exists
    // check for images,avatr
    // upload yhem to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from rsponse
    // check for user creation
    // return response to frontend
    

    const {fullName, email,username, password} = req.body;
    if(
        [fullName, email, username, password].some((field)=> field?.trim() === "")
    ){
        throw new  apiError(400, "All fields are required");
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }],
    })

    if (existedUser) {
        throw new apiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath){
        throw new apiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new apiError(400, "Avatar file is required");
    }
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await  user.findBYId(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new apiError(500, "User creation failed");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});



export { registerUser };