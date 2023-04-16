const express = require('express');
const jwt = require('jsonwebtoken');
const { UsersRecord } = require("../database/UsersRecord");
const bcrypt = require("bcrypt");
const router = express.Router();
const middleware = require('../config/middleware')
const { verifyToken, publicKey, privateKey, queryParameterize } = require('../config/config');
router.use(middleware);

router.get('/', verifyToken, (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                console.error(err);
                res.status(401).render('home', { layout: 'users/login' });
            } else {
                res.status(200).render('home', { layout: 'home' });
            }
        });
    } else {
        res.status(200).render('home', { layout: 'users/login' });
    }
});

router.post("/", async (req, res) => {
    try {
      const user = req.body.username;
      const password = req.body.password;
      if (!user || !password) {
        return res.status(400).send("Username and password are required");
      }

      const ifUser = await UsersRecord.selectByUsername([user]);
      if (user.match(queryParameterize)) {
        if (ifUser.length === 0) {
          return res.status(401).render("home", { layout: "users/wrongUser" });
        }

        const hashedPassword = ifUser[0].password;
        const result = await bcrypt.compare(password, hashedPassword);
        if (!result) {
          return res.status(401).render("home", { layout: "users/wrongPass" });
        }
        
        const payload = { user: "example" };
        const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie("user", user, { httpOnly: true, secure: true, sameSite: 'strict' });

        if (ifUser[0].role === "admin") {
          return res.status(200).redirect('/admin');
        } else {
          return res.status(200).render("home", { layout: "home" });
        }
      } else {
        return res
          .status(400)
          .send("You can't just do a SQL Injection attack and think everything is fine");
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("Unknown server error. Please contact your administrator.");
    }
  });
  

module.exports = router;