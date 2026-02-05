const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const index = require("./routes/index.js");
const webhooks = require("./routes/webhooks");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000


app.set("trust proxy", 1);

app.use("/webhooks", webhooks);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// app.use(cors({
//     origin: ["http://localhost:3000", "https://divyesh-9840.myshopify.com"],


//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));


connectDB();



// Routes
app.use("/api", index);



app.listen(port, () => {
    console.log("Server running on port 5000");
});
