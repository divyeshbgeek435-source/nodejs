const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const index = require("./routes/index.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

require("dotenv").config();


app.use(express.json());
// app.use(cors({
//     origin: ["http://localhost:3000", "https://divyesh-9840.myshopify.com"],


//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));

app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});



connectDB();

// Routes
app.use("/api", index);

const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log("Server running on port 5000");
});