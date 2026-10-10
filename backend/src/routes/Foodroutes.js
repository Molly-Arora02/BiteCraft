const express = require("express");
const router = express.Router();
 
const foodController = require("../controllers/foodController.js");
const { auth, authorizeRoles } = require("../middleware/auth.js");
// ADMIN OR USER
  
router.get("/", auth, foodController.getFoods);
router.get("/:id", auth, foodController.getFoodById); 

//ADMIN
      
router.post("/", auth, authorizeRoles("admin"), foodController.createFood); 
router.put("/:id", auth, authorizeRoles("admin"), foodController.updateFood); 
router.delete("/:id", auth, authorizeRoles("admin"), foodController.deleteFood); 

module.exports = router;