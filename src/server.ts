import express, { Request, Response } from "express";
import router from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const port: Number = 5000;


app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({message: "Hello World!"});
})

app.use(router);

app.listen(port, () => {
    console.log(`Running in port ${port} 🚀`);
});