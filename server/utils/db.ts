import mongoose from "mongoose";
require('dotenv').config();
console.log(process.env.DB_URI);
const dburi: string = process.env.DB_URI || '';
const connectDB = async () => {
    try {
        await mongoose.connect(dburi).then((data: any) => {
            console.log(`database connected with ${process.env.DB_URI}`);
        })
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);

    }
}
export default connectDB;