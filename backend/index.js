import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/mongodbConnection.js";


const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use('/api/users', userRoutes)



app.get("/", (req, res) => {
  res.send("am live Bby");
});


app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server run on port ${PORT}`)
});
