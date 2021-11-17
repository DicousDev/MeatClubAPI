import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
    return res.status(200).json({message: "Hello World!"});
})

app.listen(port, () => {
    console.log(`Running in port ${port} 🚀`);
})