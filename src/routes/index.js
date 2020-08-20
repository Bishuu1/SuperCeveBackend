const { Router } = require("express");
const router = Router();
const { loginUser, getUsers } = require("../controllers/UsersController");

router.route("/index", (req, res) => {
  res.send("Backend its working!");
});
router.route("/login").post(loginUser).get(getUsers);

module.exports = router;
