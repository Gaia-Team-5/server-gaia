const Express = require('express');
const path = require('path');
const fs = require('fs');

const route = Express.Router();

const situationJson = path.resolve(__dirname, 'database', 'data.json');

route.get('/get-cases', async (request, response) => {
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
});

module.exports = route;
