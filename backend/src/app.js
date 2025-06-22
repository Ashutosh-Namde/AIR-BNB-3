const express = require("express")
const router = require("./router/user.router")

const app = express()

app.use(express.json())

app.use("/auth" , router)

module.exports = app