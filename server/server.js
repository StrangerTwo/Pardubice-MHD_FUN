const express = require('express');
const app = express();
const port = 3000;
const api = require("./api");

app.use(express.static('../public'));
app.header("Service-Worker-Allowed", "/public/");

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use('/api', api);