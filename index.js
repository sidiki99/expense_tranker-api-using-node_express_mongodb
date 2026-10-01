const express = require ("express");
const {connectToDB}= require("./config/db")
const staticRoute = require("./routes/staticRouter")
const path = require("path");
const userRoute = require("./routes/user")

const app = express();
const PORT = 8002;

app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API is running"
  });
});


app.use("/",staticRoute)

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))
app.use("/user",userRoute)


connectToDB("mongodb://127.0.0.1:27017/expense_tracker")
.then(()=>console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));


app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});