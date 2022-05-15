import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.route"; 

  require('dotenv').config({ path: __dirname + '/.env' })

//const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

//app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/api", userRouter);


app.use("/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
