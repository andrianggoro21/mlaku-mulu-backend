import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mainRouter from "./routes/mainRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
