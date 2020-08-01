const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv/config');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: process.env.VERSION_NLU,
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY_NLU,
  }),
  url: process.env.URL_NLU,
});

const processing = async (message) => {
  const analyzeParams = {
    text: message,
    features: {
      emotion: {},
    },
  };

  const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams);

  return analysisResults;
};

module.exports = {
  processing,
};
