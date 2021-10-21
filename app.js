const express = require('express');
const axios = require('axios');
const app = express();

const AppController = require('./src/controller');

app.get('/api/ping', AppController.home);
app.get('/api/posts', AppController.post);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
