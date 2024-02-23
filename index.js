// -------------------- REQUIREMENTS --------------------
const express = require("express")
const mainRouter = require("./src/routers/mainRouter")

// -------------------- APP --------------------
const app = express()

// -------------------- SETTINGS --------------------
app.set("view engine", "ejs")
app.set("views", __dirname + "/src/views")

// -------------------- USES --------------------

app.use(express.static(__dirname + "/public"))

// -------------------- ROUTERS --------------------
app.use(mainRouter)

// -------------------- SERVER --------------------
const PORT = 3005
app.listen(PORT, () => console.log(`running server on port ${PORT}`))