const express = require('express');

const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

// middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mobile planet server is running');
});

app.listen(port, (req, res) => {
  console.log(`Mobile planet running on ${port}`);;
});