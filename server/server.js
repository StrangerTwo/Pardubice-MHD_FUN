const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const api = require("./api");

app.use(express.static(
  '../public',
  {
      setHeaders: (res) => {
          res.setHeader('Service-Worker-Allowed', '/')
      }
  }
));

// app.use(express.static('../public'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use('/api', api);


// app.post('/api/updatePlaces', (req, res) => {
//   console.log('body :', req.body);
//   fs.writeFileSync(__dirname + "/../public/places.json", req.body);
// })