import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";

import adminRouter from "./routes/AdminRouter";
import loginRouter from "./routes/LoginRouter";
import profileRouter from "./routes/ProfileRouter";
import registerRouter from "./routes/RegisterRouter";

const app = express();
const port = process.env.PORT;
console.log(port);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/register", registerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
