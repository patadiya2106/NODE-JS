const express = require("express");
const router = express.Router();

const {
    register,
    login,
    viewAuth,
    getProfile,
    updateAuth
} = require("../controllers/auth.controllers");

router.post("/register", register);

router.post("/login", login);

router.patch("/authprofile", viewAuth);

router.get("/profile", getProfile);

router.put("/profile", updateAuth);

module.exports = router;