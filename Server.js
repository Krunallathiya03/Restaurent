const express = require("express");
const dotenv  = require("dotenv");
const { connect } = require("mongoose");
const connectDb = require("./config/db");



const app = express();
dotenv.config();

//DB connection
connectDb();


//midddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/auth',require("./routes/authRoutes"))
app.use('/api/v1/user',require("./routes/userRoutes"))
app.use('/api/v1/restaurent',require("./routes/restaurentRoutes"))
app.use('/api/v1/category',require("./routes/categoryRoutes"))
app.use('/api/v1/food',require("./routes/foodRoutes"))
//port
const port = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send("Kam thai gu..")
});

app.listen(port,()=>{
    console.log(`Server is running`)
});