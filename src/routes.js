const Express = require('express');
const path = require('path');
const fs = require('fs');

const route = Express.Router();

const situationJson = path.resolve(__dirname, 'database', 'data.json');

const incomingCases = [];

const reports = [
  "Family isolated at house, can't get out. Risk of water getting in.",
  'Person alone in car rooftop. Strong stream, iminent danger.',
  'Family trying to save properties. Water rising.',
  'Person isolated in city street, strong water flow.',
];

const status = [
  'ongoing',
  'pending',
];

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

let i = 1;

route.post('/process-message', async (request, response) => {
  const { message } = request.body;

  try {
    const { result } = await NaturalLanguageUnderstanding.processing(message);

    const emotions = result.emotion.document.emotion;

    const criticalLevel = (emotions.sadness + emotions.fear) / 2 > emotions.joy ? 'urgent' : 'medium';

    const randomIndex = (Math.random() * latitudes.length - 1).toFixed();
    const randomIndex2 = (Math.random() * longitudes.length - 1).toFixed();
    const randomReport = (Math.random() * reports.length - 1).toFixed();
    const randomStatus = (Math.random() * 2).toFixed();

    console.log(`RANDOM${randomIndex}`);

    const newLatitude = latitudes[randomIndex];
    const newLongitude = longitudes[randomIndex2];
    const newReport = reports[randomReport];
    const newStatus = status[randomStatus];

    const newCase = {
      id: i,
      category: {
        title: 'isolated',
      },
      gaia_report: newReport,
      risk: criticalLevel,
      location: {
        latitude: newLatitude,
        longitude: newLongitude,
      },
      created_at: new Date().getDate(),
      status: newStatus,
      action_taken: 'No actions have been taken yet.',
    };

    incomingCases.push(newCase);

    i += 1;

    return response.status(200).json(incomingCases);
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
