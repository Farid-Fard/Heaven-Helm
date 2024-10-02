const express = require ("express")
const router = express.Router()

const{getAllItems,
     createItem,
      deleteItem,
       updateItem
    } = require("../controllers/item")

router.get("/",getAllItems)
router.post("/create", createItem)
router.put("/update/:itemId",updateItem)
router.delete("/delete/:itemId",deleteItem)
module.exports = router
