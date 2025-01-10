const { Pool } = require("pg");

const myObject = {};
require('dotenv').config({ processEnv: myObject });


// All of the following properties should be read from environment variables

module.exports = new Pool({
  host: myObject.HOST, 
  user: myObject.ROLE_NAME,
  database: myObject.DATABASE,
  password: myObject.PASSWORD,
  port: 5432
});