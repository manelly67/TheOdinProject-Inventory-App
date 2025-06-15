# Project: Inventory Application
This project follows the specifications within the curriculum of The Odin Project 
https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application


NodeJs Express EJS Postgres
---------------------------

The project uses Node.js with Express and EJS views along with PostgreSQL. This setup allows for a full-stack JavaScript application where Node.js and Express handle the backend, EJS is used for server-side rendering of views, and PostgreSQL serves as the relational database.

Description
-----------

This is an Inventory management app for an imaginary store. The core of the app is the functionality of an inventory.It should have categories and items, so when the user goes to the home-page they can choose a category to view, and then get a list of every item in that category. 
<br>
<br>
As this is a study project, a free server mode is used, so you have to wait 1 minute for the server to wake up.

Functionality
-------------
The app includes the following core functionality:

### No authorization required ###
The app includes all of the CRUD methods for both items and categories. Users can create and read, but to protect destructive actions (like deleting and updating) users must enter a secret admin password to confirm this kind of action.

### EJS views ###
The views are breaking down into smaller, reusable partials components.

### Data validation ###
The data is validated using express-validator, defining validation rules for different parts of the request and cleaning the input data to remove any potentially harmful content.

### relational database ###
The project well-defined relationships and constraints to ensure proper functionality.
- item must be associated with a previously created category.
- item characteristics are defined in the database.
- categories containing items cannot be deleted.
- updating and deleting require an admin password.

### CSS styles ###
Responsive design for screens of different sizes.

### Credits ###
The app is hosted in render.com
<br>
The url for the app is https://theodinproject-origami-store.onrender.com/
<br>
The database is hosted in neon.tech
