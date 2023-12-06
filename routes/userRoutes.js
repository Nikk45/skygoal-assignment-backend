const express = require("express");
const userLogin = require("../controllers/userLogin");
const userSignup = require("../controllers/userSignup");
const userDetails = require("../controllers/userDetails");
const auth = require('../middleware/authMiddleware')

const app = express();

app.post('/user-login', userLogin);
app.post('/user-signup', userSignup);
app.get('/user-details',auth, userDetails);

module.exports = app;