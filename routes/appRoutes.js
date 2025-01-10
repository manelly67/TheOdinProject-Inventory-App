const express = require("express");
const appController = require("../controllers/appController");
const router = express.Router();



router.get("/", appController.getHomePage );

router.get("/all", appController.getAllCourses );

router.get("/all/:id", appController.getCoursesByCategory );

router.get("/newcourse", appController.newCourseGet);
router.post("/newcourse", appController.newCoursePost);

router.get("/item/:id/update", appController.itemUpdateGet);
router.post("/item/:id/update", appController.itemUpdatePost);

router.post("/item/:id/delete", appController.itemDeletePost);





module.exports = router;