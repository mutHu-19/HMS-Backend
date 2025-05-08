import mongoose from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last name must contain at least 3 characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email!"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone number must contain exact 10 Digits!"],
        maxLength: [10, "Phone number must contain exact 10 Digits!"]

    },
    nic:{
        type: String,
        required: true,
        minLength: [12, "NIC must contain exact 12 Digits!"],
        maxLength: [12, "NIC must contain exact 12 Digits!"]
    },
    dob:{
        type: Date,
        required: [true, "DOB is required!"]
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
   appointment_date:{
    type:String,
    required: true,
   },
   department:{
    type:String,
    required: true,
   },
   doctor:{
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    }
   },hasVisted: {
    type: Boolean,
    default: false,
   },
   doctorId:{
    type: mongoose.Schema.ObjectId,
    required: true,
   },
   patientId:{
    type: mongoose.Schema.ObjectId,
    required: true,
   },
   address:{
    type: String,
    required: true,
   },
   status:{
    type: String,
    enum:["Pending","Accepted","Rejected"],
    default: "Pending",
   },
});

export const Appointment = mongoose.model("Appointment",appointmentSchema);