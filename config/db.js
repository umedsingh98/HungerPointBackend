import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://umedsingh2981998:Pmqo5LnvdDYIvnUC@umedsingh.kol9o.mongodb.net/hungerpoint?retryWrites=true&w=majority&appName=umedSingh').then(() => console.log("MongoDB connected"))
}