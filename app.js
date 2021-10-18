const express = require('express');
const app = express();

app.get('/api/ping', (req, res) => {
  res.status(200).json({ success: true });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
