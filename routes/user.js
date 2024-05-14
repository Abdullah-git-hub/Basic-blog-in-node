const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndReturnToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("login", { error: error.message });
    }
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });

    try {
        const token = await User.matchPasswordAndReturnToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("login", { error: error.message });
    }
});

module.exports = router;
