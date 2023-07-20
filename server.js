const express = require('express');
const app = express();
const path = require('path');

const port = 5000; // Choose any available port number you prefer

// Serve static files (index.html and index.js) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
