import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    } = req.body;
    if(
        !firstName||
        !lastName||
        !email||
        !phone||
        !password||
        !gender||
        !dob||
        !nic||
        !role
    ){
        return next(new ErrorHandler("Please fill full form!",400));
    }
    let user = await User.findOne({ nic});
    if (user){
        return next(new ErrorHandler("User Already Registered!",400))
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    });
    generateToken(user,"user Registered!",200,res);
});

export const login = catchAsyncErrors(async (req,res,next) => {
    const { email, password, confirmPassword, role} = req.body;
    if (!email|| !password|| !confirmPassword|| !role){
        return next(new ErrorHandler ("Please Provide All Setails!",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password do not match with Confrim Password!",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found!",400));
    }
    generateToken(user,"user Login Successfully!",200,res);

});

export const addNewAdmin = catchAsyncErrors(async(req, res, next) => {
    const{
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
    } = req.body;
    if(
        !firstName||
        !lastName||
        !email||
        !phone||
        !password||
        !gender||
        !dob||
        !nic
    ){
        return next(new ErrorHandler("Please fil full form!",400));
    }
    const isRegistered = await User.findOne({ email});
    if (isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exisits!`));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role:"Admin",
    });
    res.status(200).json({
        success: true,
        message: "New admin registered!",
    })
});

export const getAllDoctors = catchAsyncErrors(async(req, res, next)=>{
    const doctors = await User.find({role: "Doctor"})
        res.status(200).json({
            success: true,
            doctors
        })
})
export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200)
    .cookie("adminToken", "",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: " User logged out successfully!",
    });
});

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200)
    .cookie("patientToken", "",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: " Patient logged out successfully!",
    });
});


export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
    } = req.body;

    if (
        !firstName || !lastName || !email || !phone || !password ||
        !gender || !dob || !nic || !doctorDepartment
    ) {
        return next(new ErrorHandler("Please provide full details", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`, 400));
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        docAvatar.tempFilePath,
        { folder: "avatars" }
    );

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New doctor registered!",
        doctor,
    });
});
