const express = require("express");
const UserController = require("../controller/user.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.get("/test", UserController.test);
router.put("/update/:id",  UserController.updateUser);
router.delete('/delete/:id',  UserController.deleteUser)
router.post('/signOut', UserController.signOut);
router.get('/getUsers' , UserController.getUsers)
router.delete('/deleteUser/:id' , UserController.deleteUser)

module.exports = router;
