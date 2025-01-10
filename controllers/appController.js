const { appObject } = require('../appObject');
const db = require("../db/queries");
const { body, validationResult} = require("express-validator");

async function getHomePage(req, res) {
    const categories = await db.getAllCategories();
    res.render("index", { appObject: appObject, title: appObject.title[0], categories: categories });
  };

async function getAllCourses(req, res) {
    const allCourses = await db.getAllCourses();
    const category = "ALL CATEGORIES";
    res.render("items", { appObject: appObject, title: appObject.title[2], courses: allCourses, category:category });
};

async function getCoursesByCategory(req, res) {
  const id = req.params.id;
  const category = await db.getNameCategory(id);
  const coursesByCategory = await db.getCoursesByCategory(id);
  res.render("items", { appObject: appObject, title: `Category ${category}`, courses: coursesByCategory, category:category });
};

// courses controllers add new -update - delete

async function newCourseGet(req, res) {
  const types = appObject.typeOfCourse;
  const categories = await db.getAllCategories();
  const levels = await db.getAllLevels();
  res.render("newCourse", { appObject: appObject, title: appObject.title[3], types:types, categories:categories, levels:levels});
};


const lengthErr = "30 characters max.";
const validateCourse = [
  body("name").trim().notEmpty().escape().isLength({ min: 1, max: 30 }).withMessage(`Course name ${lengthErr}`),
];

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
  console.log(item);
  res.render("updateCourse",{appObject: appObject,title: `Update Item ${id}`,item:item[0],types:types,categories:categories,levels:levels});
};

const validateCourse2 = [
  body("updatename").trim().notEmpty().escape().isLength({ min: 1, max: 30 }).withMessage(`Course name ${lengthErr}`),
];

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
    getHomePage,
    getAllCourses,
    getCoursesByCategory,
    newCourseGet,
    newCoursePost,
    itemUpdateGet,
    itemUpdatePost,
    itemDeletePost, 
  };