import express from "express";
const router = express.Router();
import User from "../../models/userModel.js";
import { msg } from "../../messages.js";

router.post("/createuser", (req, res) => {
  console.log("req.body: ", req.body);
  if (typeof req.body.username == "undefined")
    return res.status(500).json({ errorMsg: "username invalid" });

  User.findOne({ username: req.body.username })
    .then((existingUser) => {
      if (existingUser) {
        res
          .status(200)
          .json({ successMsg: "Login successfully", login: true, result: existingUser });
        return null;
      } else {
        var newUser = new User({
          username: req.body.username,
        });

        return newUser.save();
      }
    })
    .then((result) => {
      if (result) {
        const userObj = result.toObject();
        res
          .status(200)
          .json({ successMsg: "Created successfully", login: false, result: userObj });
      }
    })
    .catch((e) => {
      console.error(e);
      return res.status(500).json({ errorMsg: "account create failed" });
    });
});

router.post('/logout', (req, res) => {
  return res.status(200).json({ successMsg: msg.logout })
})

export default function (app) {
  app.use('/api/user', router)
}
