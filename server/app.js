require('dotenv').config()
const express = require('express')
const router = require('./routes/restaurant')
const chalk = require('chalk');
const cors = require('cors');


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/restaurants", router);

const PORT = 4000 || process.env.PORT

app.listen(PORT, ()=>{
  console.log(`listening at port ${chalk.yellow(PORT)}`);
})
