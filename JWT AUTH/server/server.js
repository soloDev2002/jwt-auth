import express from "express";
import dotenv from "dotenv";
import login from "./routes/login.js";
import cors from "cors";
import post from "./routes/post.js";
import mongoose from "mongoose";

//configure app
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://jwt-auth-27e25.web.app",
  })
);
app.use("/login", login);
app.use("/post", post);

//connecting to mongoDb
mongoose
  .connect(process.env.MONGODB_KEY, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    //listening to port
    app.listen(PORT, () => {
      console.log("connected");
    });
  })
  .catch((err) => console.log(err));

mongoose.set(`useFindAndModify`, false);
