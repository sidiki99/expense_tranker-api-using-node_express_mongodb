const express =  require("express");
const router = express.Router();
const {handleUserLogin,handleUserSignup}=require("../controllers/user")
 
router.get("/signup",(req,res)=>{
  return res.render("signup")
})
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

router.get("/login",(req,res)=>{
  return res.render("login")
})

module.exports = router;