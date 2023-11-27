import express from "express";
import chalk from "chalk";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import mongoose from "./config/dbConnect.js";
import router from "./routes/router.js";

const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

mongoose.connection.on("connected", () => {
    console.log(chalk.bgGreenBright(chalk.black("Connected to MongoDB!")));
});

mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use("/", router);

app.listen(PORT, () => {
    console.log(chalk.bgCyan(`Server Running on PORT ${PORT}...`));
});
