const Express = require('express');
const path = require('path');
const fs = require('fs');

const assistant = require('./lib/Assistent');
const NaturalLanguageUnderstanding = require('./lib/NaturalLanguageUnderstanding');

const route = Express.Router();

const situationJson = path.resolve(__dirname, 'database', 'data.json');

route.get('/get-cases', async (request, response) => {
  try {
    const json = fs.readFileSync(situationJson);

    const data = JSON.parse(json);

    const { result } = await NaturalLanguageUnderstanding.processing(data[0].gaia_report);

    const emotions = result.emotion.document.emotion;

    const critic = (emotions.sadness + emotions.fear) / 2 > emotions.joy ? 'urgent' : 'medium';

    const value = (emotions.sadness + emotions.fear) / 2;

    return response.status(200).json({ respostaDoNLU: { critic, value }, data, result });
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

route.get('/get-case/:id', (request, response) => {
  const { id } = request.params;

  try {
    const json = fs.readFileSync(situationJson);

    const data = JSON.parse(json);

    let theCase;

    data.forEach((emergencyCase) => {
      if (emergencyCase.id === id) {
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
