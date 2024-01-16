// -------------------- REQUIREMENTS --------------------
const {Router} = require("express")
const mainController = require("../controllers/mainController")

// -------------------- ROUTER --------------------
const router = Router()

// -------------------- ROUTES --------------------
router.get("/", mainController.index)

// -------------------- EXPORT --------------------
module.exports = router