import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName: "HospitalManagementSystem",
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log(`Some error occurd while connecting to database: ${err}`);
    });
}