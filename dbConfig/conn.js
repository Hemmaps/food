import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const dbConnect = mongoose.connect(process.env.URL)
.then(()=> console.log("Database is connected"))
.catch(()=> console.log("Database is not connected"))

export default dbConnect;