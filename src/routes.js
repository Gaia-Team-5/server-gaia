const Express = require('express');
const path = require('path');
const fs = require('fs');

const assistant = require('./lib/assistent');

const route = Express.Router();

const situationJson = path.resolve(__dirname, 'database', 'data.json');

route.get('/get-cases', (request, response) => {
  try {
    const json = fs.readFileSync(situationJson);

    const data = JSON.parse(json);

    return response.json(data);
  } catch (error) {
    return response.send(error);
  }
});

route.get('/get-case/:id', (request, response) => {
  const { id } = request.params;

  try {
    const json = fs.readFileSync(situationJson);

    const data = JSON.parse(json);

    let theCase;

    data.forEach((emergencyCase) => {
      if (emergencyCase.id == id) {
        theCase = emergencyCase;
      }
    });

    return response.json(theCase);
  } catch (error) {
    return response.send(error);
  }
});

route.get('/conversation/:text*?', async (request, response) => {
  const { text } = request.params;

  const sessionId = await assistant.session();

  assistant.message(text, sessionId)
    .then((result) => response.json({ assistant: result }))
    .catch((err) => response.json({ error: err }));
});

module.exports = route;
