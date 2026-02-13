import express from "express";
import cors from "cors";
import connectDB from "./db/db.js"
import userRoute from "./routes/user.routes.js"

const app = express();

connectDB();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/users",userRoute)



export default app;