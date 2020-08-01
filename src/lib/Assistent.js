const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv/config');

const service = new AssistantV2({
  version: process.env.VERSION_ASSISTANT,
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY_ASSISTANT,
  }),
  url: process.env.URL_ASSISTANT,
});

const assistantId = process.env.ASSISTANT_ID;

const session = async () => {
  try {
    const response = await service.createSession({
      assistantId,
    });

    return response.result.session_id;
  } catch (err) {
    return err;
  }
};

const message = (text, sessionId) => {
  const payload = {
    assistantId,
    sessionId,
    input: {
      message_type: 'text',
      text,
    },
  };

  return new Promise((resolve, reject) => {
    service.message(payload, (err, data) => {
      if (err) {
        console.error('Failed to send message to Watson Assistant');
        console.error(err);
        reject(err);
      } else {
        resolve(data.result.output);
      }
    });
  });
};

module.exports = {
  session,
  message,
};
