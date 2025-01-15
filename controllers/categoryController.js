const { appObject } = require('../appObject');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const myObject = {};
require('dotenv').config({ processEnv: myObject });

// validate Category
const lengthCategErr = 'max 15 characters';
const validateCategory = [
  body('newcategory')
    .trim()
    .escape()
    .isLength({ min: 0, max: 15 })
    .withMessage(`${lengthCategErr}`),
];
const validateCategory2 = [
  body('updatecategory')
    .trim()
    .escape()
    .isLength({ min: 0, max: 15 })
    .withMessage(`${lengthCategErr}`),
];

/* New Category Get - Add - Update - Delete */

async function newCategoryGet(req, res) {
  const categories = await db.getAllCategories();
  res.render('index', {
    appObject: appObject,
    title: appObject.title[0],
    categories: categories,
    categoryIndex: 'add',
    deleteCategMessage: undefined,
    needCredential: false,
  });
}

const newCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render('index', {
        appObject: appObject,
        title: appObject.title[0],
        categories: categories,
        categoryIndex: 'add',
        deleteCategMessage: undefined,
        needCredential: false,
        errors: errors.array(),
      });
    }
    const categoryToAdd = req.body.newcategory;
    await db.insertCategory(categoryToAdd);
    res.redirect('/');
  },
];

async function updateCategoryGet(req, res) {
  const categories = await db.getAllCategories();
  const { id } = req.params;
  const formAction = `/updatecategory/${id}`;
  const categoryValue = await db.getNameCategory(id);
  res.render('index', {
    appObject: appObject,
    title: appObject.title[0],
    categories: categories,
    categoryIndex: 'update',
    deleteCategMessage: undefined,
    needCredential: false,
    idToUpdate: id,
    categoryValue: categoryValue,
    formAction: formAction,
  });
}

const updateCategoryPost = [
  validateCategory2,
  async (req, res) => {
    const errors = validationResult(req);

    const { id } = req.params;
    const formAction = `/updatecategory/${id}`;
    const categoryValue = await db.getNameCategory(id);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render('index', {
        appObject: appObject,
        title: appObject.title[0],
        categories: categories,
        categoryIndex: 'update',
        deleteCategMessage: undefined,
        needCredential: false,
        idToUpdate: id,
        categoryValue: categoryValue,
        formAction: formAction,
        errors: errors.array(),
      });
    }
    const nameUpdated = req.body.updatecategory;
    await db.updateCategory(id, nameUpdated);
    res.redirect('/');
  },
];

async function countItemsIndex(arg) {
  const id = arg;
  const numberOfItems = await db.countItems(id);
  if (numberOfItems === 0) {
    return true;
  } else {
    return false;
  }
}

async function deleteCategoryPost(req, res) {
  const { id } = req.params;
  const indicator = await countItemsIndex(id);
  switch (indicator) {
    case true:
      await db.deleteCategory(id);
      res.redirect('/');
      break;
    case false: {
      const categories = await db.getAllCategories();
      res.render('index', {
        appObject: appObject,
        title: appObject.title[0],
        categories: categories,
        categoryIndex: 'get',
        needCredential: false,
        deleteCategMessage: 'Categories with items cannot be deleted',
      });
      break;
    }
  }
}

module.exports = {
  newCategoryGet,
  newCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  countItemsIndex,
  deleteCategoryPost,
};
