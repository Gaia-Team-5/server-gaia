const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const service = new AssistantV2({
  version: '2020-07-30',
  authenticator: new IamAuthenticator({
    apikey: '7zBgAvOdoleSEAd6RctU6UM_4y19GTGQyJOECVNYcg03',
  }),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/0662ef1f-7e70-4183-a2ff-88dde6aa2e87',
});

const assistantId = '05ded7e0-0248-4b20-9cb1-2003ec2adb0c';

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
