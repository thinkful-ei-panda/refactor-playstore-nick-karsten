const express = require('express');
const morgan = require('morgan');
const app = express();
const apps = require('./playstore-data.js');

app.use(morgan('common'));

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) comparison = 1;
    if (varA < varB) comparison = -1;
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

app.get('/apps', (req, res) => {
  const { sort = '' } = req.query;
  const { genre = '' } = req.query;

  let results = apps;
  const genres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  //   if (genre && !genres.includes(genre.toLowerCase())) {
  //     return res.status(400).send('Please select from available genres');
  //   }
  if (genre) {
    results = results.filter((app) => {
      return app.Genres.toLowerCase() === genre.toLowerCase();
    });
  } else {
    results;
  }

  if (sort === 'rating') {
    results = results.sort(compareValues('Rating'));
  }
  if (sort === 'app') {
    results = results.sort(compareValues('App'));
  }

  res.json(results);
});

module.exports = { app, compareValues };

// sort	'rating' or 'app'	sort the list by either rating or app, any other value results in an error, if no value provided do not perform a sort.

// genres	one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']	If present the value must be one of the list otherwise an error is returned. Filter the list by the given value.
