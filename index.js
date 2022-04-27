const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const router = require('./routes/router.js');

app.use('/api', router);

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
});