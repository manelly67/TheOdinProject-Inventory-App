const { appObject } = require('../appObject');
const db = require("../db/queries");
const { body, validationResult} = require("express-validator");

const myObject = {};
require('dotenv').config({ processEnv: myObject });

// validate Course
const lengthErr = "30 characters max.";
const validateCourse = [
  body("name").trim().notEmpty().escape().isLength({ min: 1, max: 30 }).withMessage(`Course name ${lengthErr}`),
];
const validateCourse2 = [
  body("updatename").trim().notEmpty().escape().isLength({ min: 1, max: 30 }).withMessage(`Course name ${lengthErr}`),
];

// courses controllers add new -update - delete

async function newCourseGet(req, res) {
    const types = appObject.typeOfCourse;
    const categories = await db.getAllCategories();
    const levels = await db.getAllLevels();
    res.render("newCourse", { appObject: appObject, title: appObject.title[3], types:types, categories:categories, levels:levels});
  };


  const newCoursePost =[
    validateCourse,
    async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       const categories = await db.getAllCategories();
       const levels = await db.getAllLevels();
       return res.status(400).render("newCourse", {
         appObject: appObject, 
         title: appObject.title[3], 
         types: appObject.typeOfCourse,
         categories:categories, 
         levels:levels,
         errors: errors.array(),
       });
     }
     
     const { name, category, type, level } = req.body;
     const courseToAdd = { name: name, type: type, id_category:category, id_level:level };
     await db.insertCourse(courseToAdd);
     res.redirect(`/all/${category}`);
    }
 ];
 
 async function itemDeletePost(req,res) {
   const id = req.params.id;
   await db.deleteItem(id);
   res.redirect('/all');
 }
  
 async function itemUpdateGet(req,res) {
   const id = req.params.id;
   const item = await db.getItem(id);
   const types = appObject.typeOfCourse;
   const categories = await db.getAllCategories();
   const levels = await db.getAllLevels();
   res.render("updateCourse",{appObject: appObject,title: `Update Item ${id}`,item:item[0],types:types,categories:categories,levels:levels});
 };
 
 const itemUpdatePost = [
   validateCourse2,
   async (req, res) => {
    const id = req.params.id;
    const item = await db.getItem(id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      const levels = await db.getAllLevels();
      return res.status(400).render("updateCourse", {
        appObject: appObject, 
        title: `Update Item ${id}`,
        item:item[0], 
        types: appObject.typeOfCourse,
        categories:categories, 
        levels:levels,
        errors: errors.array(),
      });
    }
    
    const { updatename, category, type, level } = req.body;
    const courseToUpdate = { id:item[0].id, name: updatename, type: type, id_category:category, id_level:level };
    await db.updateCourse(courseToUpdate);
    res.redirect(`/all/${category}`);
   }
 ];
 
 
 module.exports = {
    newCourseGet,
    newCoursePost,
    itemUpdateGet,
    itemUpdatePost,
    itemDeletePost,
  };