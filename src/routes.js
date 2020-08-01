const Express = require('express');
const path = require('path');
const fs = require('fs');

const assistant = require('./lib/Assistent');
const NaturalLanguageUnderstanding = require('./lib/NaturalLanguageUnderstanding');

const route = Express.Router();

const situationJson = path.resolve(__dirname, 'database', 'data.json');

const incomingCases = [];

const latitudes = [
  -30.0502131,
  -30.0294223,
  -30.0651334,
  -30.0244304,
  -30.0060371,
  -30.0094564,
  -30.0236979,
  -30.0449249,
];

const longitudes = [
  -51.2065934,
  -51.1843298,
  -51.1770342,
  -51.1626233,
  -51.1683772,
  -51.1978657,
  -51.2047012,
  -51.2035148,
  -51.1706808,
];

route.post('/process-message', async (request, response) => {
  const { message } = request.body;

  try {
    const { result } = await NaturalLanguageUnderstanding.processing(message);

    const emotions = result.emotion.document.emotion;

    const criticalLevel = (emotions.sadness + emotions.fear) / 2 > emotions.joy ? 'urgent' : 'medium';

    const randomIndex = (Math.random() * latitudes.lenght).toFixed();

    const newCase = {
      id: 1,
      category: {
        title: 'isolated',
      },
      gaia_report: "Family isolated at house, can't get out. Risk of water getting in.",
      risk: criticalLevel,
      location: {
        latitude: -30.0502131,
        longitude: -51.2108403,
      },
      created_at: '2020-07-31T17:51:06-0300',
      status: 'pending',
      action_taken: 'No actions have been taken yet.',
    };

    incomingCases.push(newCase);

    return response.status(200).json({ criticalLevel });
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

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
