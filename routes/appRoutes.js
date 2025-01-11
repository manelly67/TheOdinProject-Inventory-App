const express = require("express");
const appController = require("../controllers/appController");
const router = express.Router();

router.get("/", appController.getHomePage );

router.get("/all", appController.getAllCourses );

router.get("/all/:id", appController.getCoursesByCategory );

// courses items
router.get("/newcourse", appController.newCourseGet);
router.post("/newcourse", appController.newCoursePost);

router.get("/item/:id/update", appController.itemUpdateGet);
router.post("/item/:id/update", appController.itemUpdatePost);

router.post("/item/:id/delete", appController.itemDeletePost);

// categories
router.get("/newcategory", appController.newCategoryGet);
router.post("/newcategory", appController.newCategoryPost);

router.get("/updatecategory/:id", appController.updateCategoryGet);
router.post("/updatecategory/:id", appController.updateCategoryPost);

router.post("/deletecategory/:id", appController.deleteCategoryPost);


module.exports = router;