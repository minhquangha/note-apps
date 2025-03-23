const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');

connectDB();

app.use(express.json());

app.use("/users",userRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})