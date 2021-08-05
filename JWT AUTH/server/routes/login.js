import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//initialising router
const router = express.Router();

//seeting api end
router.route("/").post(async (req, res) => {
  //user details
  const email = req.body.email;
  const password = req.body.password;

  //creating object for JWT
  const user = { email: req.body.email, password: req.body.password };

  if (email !== process.env.authorisedEmail) {
    res.json("WRONG CREDENTIALS");
  }
  try {
    if (await bcrypt.compareSync(password, process.env.authorisedPassword)) {
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "300s",
      });
      res.send(token);
    } else {
      res.json("WRONG CREDENTIALS");
    }
  } catch {
    res.status(500).status();
  }
});

export default router;
