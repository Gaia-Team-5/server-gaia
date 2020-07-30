const Express = require('express');

const assistant = require('./lib/assistent');

const route = Express.Router();

route.get('/', (request, response) => response.json({ message: 'Hello World!' }));

route.get('/conversation/:text*?', (request, response) => {
    const { text } = request.params;

    const sessionId = assistant.session();

    assistant.message(text, sessionId)
        .then(result => response.json({ assistant: result }))
        .catch(err => response.json({ error: err }));
});

module.exports = route;
