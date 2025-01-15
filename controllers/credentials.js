const { appObject } = require('../appObject');
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const myObject = {};
require('dotenv').config({ processEnv: myObject });

const adminPassword = process.env.ADMINPASSWORD || myObject.ADMINPASSWORD;

// validate safe password
const safePassword = [
  body("password").trim().escape(),
];

async function checkCredentGet(req, res) {
  const inf = req.params.id;
  const categories = await db.getAllCategories();
  res.render("index", {
    appObject: appObject,
    title: appObject.title[0],
    categories: categories,
    categoryIndex: 'get',
    deleteCategMessage: undefined,
    needCredential: true,
    details: inf,
  });
}


const checkCredentPost = [
  safePassword,
  async (req, res) => {
    const errors = validationResult(req);
    const { password } = req.body;
    const inf = req.params.id;
    const [action, type, id] = inf.split('_');

    switch (password === adminPassword) {
      case true:
        switch (action === 'update' && type === 'category') {
          case true:
            return res.redirect(`/updatecategory/${id}`);
          default:
            switch (action === 'delete' && type === 'category') {
              case true:
                return res.redirect(307, `/deletecategory/${id}`);
              default:
                switch (action === 'update' && type === 'item') {
                  case true:
                    return res.redirect(`/item/${id}/update`);
                  default:
                    switch (action === 'delete' && type === 'item') {
                      case true:
                        return res.redirect(307, `/item/${id}/delete`);
                      default:
                        break;
                    }
                }
            }
        }

      case false:
        const categories = await db.getAllCategories();
        res.render("index", {
          appObject: appObject,
          title: appObject.title[0],
          categories: categories,
          categoryIndex: 'get',
          needCredential: false,
          deleteCategMessage: 'Unauthorized User',
        });
    }

  }];


module.exports = {
  checkCredentGet,
  checkCredentPost,
};