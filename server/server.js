const express = require('express')
const app = express()
const port = 3000

app.use('static', express.static(__dirname + "/../public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})