const Express = require('express');

const app = Express();

app.use('/', (request, response) => response.json({ message: 'Hello World!' }));

app.listen(3333);
