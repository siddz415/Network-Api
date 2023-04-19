const router = require('express').Router();
const {getAllUsers, getSingleUser, createNewUser, editUser, deleteUser, addFriend, removeFriend}= require("../../controllers/user-controllers"); 


//3001/api/users//
router.route("/").get(getAllUsers).post(createNewUser);

//3001/api/users/:userid//
router.route("/:userId").get(getSingleUser).put(editUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend); 

module.exports=router;