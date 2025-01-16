#! /usr/bin/env node

const { Client } = require('pg');

const myObject = {};
require('dotenv').config({ processEnv: myObject });

const connectionString =
  myObject.DATABASE_URL ||
  `postgresql://${myObject.ROLE_NAME}:${myObject.PASSWORD}@${myObject.HOST}:5432/${myObject.DATABASE}`;

// hacer el populate de la base de datos local o en produccion va a depender del string de conexion
const SQL = `
CREATE TABLE IF NOT EXISTS origami_courses (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 50 ),
  type VARCHAR ( 50 ),
  id_category INTEGER,
  id_level INTEGER
);

INSERT INTO origami_courses (name, type, id_category, id_level ) 
VALUES
  ('heart','step by step images',1,1),
  ('butterfly','step by step images',2,2),
  ('guitar','step by step images',1,3),
  ('hat','step by step images',1,2),
  ('fox','step by step images',2,2),
  ('frog','step by step images',2,1),
  ('swam','step by step images',2,1),
  ('roses','online video',3,3),
  ('tulip','step by step images',3,2),
  ('carnation','online video',3,4),
  ('house','step by step images',4,2),
  ('pyramid','online video',4,4),
  ('umbrellas','online video',1,4),
  ('crane bird','online video',2,4);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR ( 25 )
);

INSERT INTO categories (category) 
VALUES
  ('things'),
  ('animals'),
  ('flowers'),
  ('buildings');

CREATE TABLE IF NOT EXISTS levels (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  levelname VARCHAR ( 30 )
);

INSERT INTO levels (levelname) 
VALUES
  ('basic'),
  ('low'),
  ('intermediate'),
  ('advanced');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
