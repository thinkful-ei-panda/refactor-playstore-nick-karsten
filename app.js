const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});

const apps = require('./playstore-data.js');

app.get('/apps', (req, res) => {
  const { search = '', sort } = req.query;

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).send('Sort must be one of rating or app');
    }
  }

  let results = apps.filter((apps) =>
    apps.App.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

// sort	'rating' or 'app'	sort the list by either rating or app, any other value results in an error, if no value provided do not perform a sort.

// genres	one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']	If present the value must be one of the list otherwise an error is returned. Filter the list by the given value.
