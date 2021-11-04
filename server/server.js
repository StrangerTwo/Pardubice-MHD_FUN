const express = require('express')
const app = express()
const port = 3000

app.use(express.static('../public'));
app.use(express.static('../public/js'));

// app.get('/', (req, res) => {
//   //res.send('HelloWorld!')
// //   res.sendFile(__dirname + "/../public/index.html");
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})