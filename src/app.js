// -------------------- REQUIREMENTS --------------------
const express = require("express")
const mainRouter = require("./routers/mainRouter")

// -------------------- APP --------------------
const app = express()

// -------------------- SETTINGS --------------------
app.set("view engine", "ejs")
app.set("views", "./src/views")

// -------------------- USES --------------------

app.use(express.static("public"))

// -------------------- ROUTERS --------------------
app.use(mainRouter)

// -------------------- SERVER --------------------
const PORT = 3005
app.listen(PORT, () => console.log(`running server on port ${PORT}`))