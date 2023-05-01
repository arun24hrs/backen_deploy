const express = require("express");
const connection = require("./db");
const userRouter = require("./Routes/user.routes");
const auth = require("./Middleware/auth.middlware");
const notesRouter = require("./Routes/notes.routes");
const cors = require("cors")
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    res.status(200).send({message: "Welcome to Home Page."});
})

app.get("/contact", (req, res)=>{
    res.status(200).send({message: "Welcome to Contact Page."});
})

app.use("/users", userRouter);
app.use(auth)
app.use("/notes", notesRouter);

app.get("/movie", (req, res)=>{
    res.status(200).send({msg: "Movies Data."})
})

app.listen(process.env.Port,async()=>{
    try {
        await connection;
        console.log("Connected to DB.");
        console.log("server running!");
    } catch (error) {
        console.log(error),
        console.log("Error connecting to DB!")
    }
})