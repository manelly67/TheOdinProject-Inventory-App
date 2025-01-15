const express = require('express');
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
const path = require('node:path');
const appRoutes = require('./routes/appRoutes.js');
const { appObject } = require('./appObject.js');

// express app
const app = express();

// middleware and to serve static assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // si no se utiliza esta middleware el post object resulta undefined

// to define the view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use('/', appRoutes);

//404 page
app.use((req, res) => {
  res
    .status(404)
    .render('404', { appObject: appObject, title: appObject.title[1] });
});

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});
