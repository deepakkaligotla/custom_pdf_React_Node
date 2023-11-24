const express = require("express");
const router = express.Router();
const routerApi = require('./api')

const app = express();

app.use(express.json())
app.use(routerApi)

module.exports = app;