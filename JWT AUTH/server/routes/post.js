import express from "express";
import user from "../model/user.js";
import userSchema from "../model/user.js";
import verification from "./verification.js";

//initialising router
const router = express.Router();
router.use(verification);

//api to create post in server
router.route("/addUser").post((req, res) => {
  const user = req.body.user;
  const email = user.email;
  const indexOfAt = email.indexOf("@");
  const indexOfDot = email.indexOf(".");
  const length = email.length;
  const name = user.name.trim();
  const indexOfSpace = name.indexOf(" ");
  if (
    indexOfDot > indexOfAt &&
    length - indexOfDot > 2 &&
    indexOfSpace === -1
  ) {
    userSchema
      .create(user)
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  } else if (indexOfSpace !== -1) {
    res.send("INVALID USER NAME");
  } else {
    res.send("INVALID EMAIL");
  }
});

//api to get all posts
router.route("/getAllUser").get((req, res) => {
  user
    .find()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

//api to delete user
router.route("/deleteUser/:id").delete((req, res) => {
  const _id = req.params.id;
  user
    .findOneAndDelete({ _id: _id })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

export default router;
