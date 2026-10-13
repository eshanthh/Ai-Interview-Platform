const express = require("express");
const cors = require("cors");
let mongoose= require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/platXDB').then(()=>{
    console.log("serverrr....");
    
})

const app = express();
app.use(
  cors()
);

app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const interviewRoutes=require("./routes/interview")

app.use("/api/auth", authRoutes);
app.use("/api/auth/login", loginRoutes);
app.use("/api/auth/signup", signupRoutes);
app.use("/api/auth", interviewRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});



app.listen(4000, () => {
  console.log(`Server running on port `);
});