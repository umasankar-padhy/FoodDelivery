
const express = require("express");
const { signup, signupcheck, login } = require("../controllers/Auth");
const { getFoodItems, getFoodCategory } = require("../controllers/getFoodItems");
const { orderData, myOrderData } = require("../controllers/orderData");
const router = express.Router();

// Define routes for user authentication and authorization

router.post("/login", login);
router.post("/signup", signup);
router.post("/signupcheck", signupcheck);
router.post("/orderData", orderData);
router.post("/myOrderData", myOrderData);
router.get("/getFoodItems", getFoodItems);
router.get("/getFoodCategory", getFoodCategory);



module.exports = router;
