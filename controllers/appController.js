const { appObject } = require('../appObject');
const db = require('../db/queries');

const myObject = {};
require('dotenv').config({ processEnv: myObject });

async function getHomePage(req, res) {
  const categories = await db.getAllCategories();
  res.render('index', {
    appObject: appObject,
    title: appObject.title[0],
    categories: categories,
    categoryIndex: 'get',
    deleteCategMessage: undefined,
    needCredential: false,
  });
}

async function getAllCourses(req, res) {
  const allCourses = await db.getAllCourses();
  const category = 'ALL CATEGORIES';
  res.render('items', {
    appObject: appObject,
    title: appObject.title[2],
    courses: allCourses,
    category: category,
  });
}

async function getCoursesByCategory(req, res) {
  const { id } = req.params;
  const category = await db.getNameCategory(id);
  const coursesByCategory = await db.getCoursesByCategory(id);
  res.render('items', {
    appObject: appObject,
    title: `Category ${category}`,
    courses: coursesByCategory,
    category: category,
  });
}

module.exports = {
  getHomePage,
  getAllCourses,
  getCoursesByCategory,
};
