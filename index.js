const express = require('express');
const app = express();

app.use(express.static(__dirname+ '/docs'));


app.listen(8080, () => console.log('Listening on 8080'));