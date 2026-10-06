const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleUserSignup(req, res) {
  const {name, email, password } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.redirect("/");
}


async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if(!user)   
    return res.render("login",{
      error  : "Invalid email or password"    

})
const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

   if (!isPasswordCorrect) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
 const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  "my-secret-key",
  {
    expiresIn: "1h",
  }
);

res.cookie("token", token, {
  httpOnly: true,
  maxAge: 60 * 60 * 1000,
});

return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin
}