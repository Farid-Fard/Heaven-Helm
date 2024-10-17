const express = require("express");
const router = express.Router();
const { authenticateToken, isLoggedIn } = require("../middleware/auth"); 
const upload = require('../middleware/upload'); 

const {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/item");


router.get("/", getAllItems);
router.post("/create", authenticateToken, isLoggedIn, upload.single('photo'), createItem);  
router.put("/update/:itemId", authenticateToken, isLoggedIn, upload.single('photo'), updateItem); 
router.delete("/delete/:itemId", authenticateToken, isLoggedIn, deleteItem);  

module.exports = router;
