const express = require("express");
const router = express.Router();

const signupCtrl = require("../controller/signup-ctrl");

router.post("/initialize", signupCtrl.initializeApp);
router.post("/signup", signupCtrl.signup);
router.post("/save/booking", signupCtrl.saveBooking);
router.get("/bookings", signupCtrl.getAvailable);
router.get("/booking/:prenom/:nom", signupCtrl.getBooking);
module.exports = router;
