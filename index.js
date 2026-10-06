const express = require ("express");
const {connectToDB}= require("./config/db")
const staticRoute = require("./routes/staticRouter")
const path = require("path");
const userRoute = require("./routes/user")
const categoryRoutes = require("./routes/categoryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const transactionViewRouter=require("./routes/transactionViewRoutes")

const categoryViewRoutes = require("./routes/categoryViewRoutes");

const app = express();
const PORT = 8002;

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const { checkAuth } = require("./middlewarse/auth");



// app.get("/",checkAuth, (req, res) => {
//   res.json({
//     message: "Expense Tracker API is running"
//   });
// });

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});


app.use("/",staticRoute)

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))
app.use("/user",userRoute)
app.use("/api/categories",checkAuth, categoryRoutes);

// app.use("/api/transactions",checkAuth, transactionRoutes);
app.use("/", dashboardRouter);

app.use( "/view", transactionViewRouter);
app.use("/view", categoryViewRoutes);


connectToDB("mongodb://127.0.0.1:27017/expense_tracker")
.then(()=>console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));


app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});