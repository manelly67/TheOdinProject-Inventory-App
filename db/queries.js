const pool = require("./pool");

async function getNameCategory(id){
  const  {rows} = await pool.query(`SELECT * FROM categories WHERE id=${id}`);
  const category = rows[0].category;
  return category;
};

async function getItem(id) {
  const { rows } = await pool.query(
    `SELECT origami_courses.id, origami_courses.name, origami_courses.type, categories.category,levels.levelname
     FROM origami_courses RIGHT JOIN categories ON (origami_courses.id_category=categories.id)
     RIGHT JOIN levels ON (origami_courses.id_level=levels.id) WHERE origami_courses.id=${id}
    `  );
    return rows;
};

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");
  return rows;
};

async function getAllLevels() {
  const { rows } = await pool.query("SELECT * FROM levels");
  return rows;
};

async function getAllCourses() {
  const { rows } = await pool.query(
    `SELECT origami_courses.id, origami_courses.name, origami_courses.type, categories.category,levels.levelname
     FROM origami_courses JOIN categories ON (origami_courses.id_category=categories.id)
     JOIN levels ON (origami_courses.id_level=levels.id) ORDER BY origami_courses.id `  );
     return rows;
 
};

async function getCoursesByCategory(id) {
  const { rows } = await pool.query(
    `SELECT origami_courses.id, origami_courses.name, origami_courses.type, categories.category,levels.levelname
     FROM origami_courses RIGHT JOIN categories ON (origami_courses.id_category=categories.id)
     RIGHT JOIN levels ON (origami_courses.id_level=levels.id) WHERE origami_courses.id_category=${id}
     ORDER BY origami_courses.id
     `  );
    return rows; 
};

async function insertCourse(courseToAdd){
  const idCategory = Number(courseToAdd.id_category);
  const idLevel = Number(courseToAdd.id_level);
  await pool.query(`INSERT INTO origami_courses(name, type, id_category, id_level) VALUES ('${courseToAdd.name}','${courseToAdd.type}',${idCategory},${idLevel})`);
};

async function updateCourse(courseToUpdate) {
  const idToUpdate = Number(courseToUpdate.id);
  const idCategory = Number(courseToUpdate.id_category);
  const idLevel = Number(courseToUpdate.id_level);
  await pool.query(`UPDATE origami_courses SET name = '${courseToUpdate.name}', type = '${courseToUpdate.type}', id_category = ${idCategory}, id_level = ${idLevel}  WHERE id = ${idToUpdate} `);
};

async function deleteItem(id) {
  await pool.query(`DELETE FROM origami_courses WHERE id=${id}`);
};

async function insertCategory(categoryToAdd){
  switch(categoryToAdd !== ''){
    case true:
      await pool.query(`INSERT INTO categories(category) VALUES ('${categoryToAdd}')`);
    case false:
      break;
  }
};

async function updateCategory(id,nameUpdated){
  const idToUpdate = Number(id);
  await pool.query(`UPDATE categories SET category = '${nameUpdated}' WHERE id = ${idToUpdate}`);
};

async function deleteCategory(id) {
  await pool.query(`DELETE FROM categories WHERE id=${id}`)
};

module.exports = {
  getNameCategory,
  getItem,
  deleteItem,
  getAllCategories,
  getAllLevels,
  getAllCourses,
  getCoursesByCategory,
  insertCourse,
  updateCourse,
  insertCategory,
  updateCategory,
  deleteCategory,
};