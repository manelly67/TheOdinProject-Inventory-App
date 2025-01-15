const express = require('express');
const appController = require('../controllers/appController');
const credentialController = require('../controllers/credentials');
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemsController');
const router = express.Router();

router.get('/', appController.getHomePage);

router.get('/all', appController.getAllCourses);

router.get('/all/:id', appController.getCoursesByCategory);

// courses items
router.get('/newcourse', itemController.newCourseGet);
router.post('/newcourse', itemController.newCoursePost);

router.get('/item/:id/update', itemController.itemUpdateGet);
router.post('/item/:id/update', itemController.itemUpdatePost);

router.post('/item/:id/delete', itemController.itemDeletePost);

// categories
router.get('/newcategory', categoryController.newCategoryGet);
router.post('/newcategory', categoryController.newCategoryPost);

router.get('/updatecategory/:id', categoryController.updateCategoryGet);
router.post('/updatecategory/:id', categoryController.updateCategoryPost);

router.post('/deletecategory/:id', categoryController.deleteCategoryPost);

// credentials
router.get('/credentials/:id', credentialController.checkCredentGet);
router.post('/credentials/:id', credentialController.checkCredentPost);

module.exports = router;
