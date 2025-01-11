const { appObject } = require('../appObject');
const db = require("../db/queries");
const { body, validationResult} = require("express-validator");

async function getHomePage(req, res) {
    const categories = await db.getAllCategories();
    res.render("index", { appObject: appObject, title: appObject.title[0], categories: categories, categoryIndex:'get' });
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

// validate Course
const lengthErr = "30 characters max.";
const validateCourse = [
  body("name").trim().notEmpty().escape().isLength({ min: 1, max: 30 }).withMessage(`Course name ${lengthErr}`),
];
const validateCourse2 = [
  body("updatename").trim().notEmpty().escape().isLength({ min: 1, max: 30 }).withMessage(`Course name ${lengthErr}`),
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



// validate Category
const lengthCategErr = 'max 15 characters';
const validateCategory = [
  body("newcategory").trim().escape().isLength({ min: 0, max: 15 }).withMessage(`${lengthCategErr}`),
];
const validateCategory2 = [
  body("updatecategory").trim().escape().isLength({ min: 0, max: 15 }).withMessage(`${lengthCategErr}`),
];

/* New Category Get - Add - Update - Delete */

async function newCategoryGet(req,res) {
  const categories = await db.getAllCategories();
    res.render("index", { appObject: appObject, title: appObject.title[0], categories: categories, categoryIndex:'add' });
};

const newCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("index", {
        appObject: appObject, 
        title: appObject.title[0], 
        categories:categories, 
        categoryIndex:'add',
        errors: errors.array(),
      });
    }
    const categoryToAdd = req.body.newcategory;
    await db.insertCategory(categoryToAdd);
    res.redirect('/');
  }
];

async function updateCategoryGet(req,res) {
  const categories = await db.getAllCategories();
  const id = req.params.id;
  const formAction = `/updatecategory/${id}`;
  const categoryValue = await db.getNameCategory(id);
  res.render("index", { 
    appObject: appObject, 
    title: appObject.title[0], 
    categories: categories, 
    categoryIndex:'update',
    idToUpdate: id, 
    categoryValue:categoryValue,
    formAction: formAction,
   });
};

const updateCategoryPost = [
   validateCategory2,
   async (req, res) => {
    const errors = validationResult(req);
    const categories = await db.getAllCategories();
    const id = req.params.id;
    const formAction = `/updatecategory/${id}`;
    const categoryValue = await db.getNameCategory(id);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("index", {
        appObject: appObject, 
        title: appObject.title[0], 
        categories: categories, 
        categoryIndex:'update',
        idToUpdate: id, 
        categoryValue:categoryValue,
        formAction: formAction,
        errors: errors.array(),
      });
    }
    const nameUpdated = req.body.updatecategory;
    await db.updateCategory(id,nameUpdated);
    res.redirect('/');
  }
];


async function deleteCategoryPost(req,res) {
  const id = req.params.id;
  await db.deleteCategory(id);
  res.redirect('/');
}

  module.exports = {
    getHomePage,
    getAllCourses,
    getCoursesByCategory,
    newCourseGet,
    newCoursePost,
    itemUpdateGet,
    itemUpdatePost,
    itemDeletePost,
    newCategoryGet,
    newCategoryPost,
    updateCategoryGet,
    updateCategoryPost,
    deleteCategoryPost,
  };