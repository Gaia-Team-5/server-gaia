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

const processResponse = (response, sessionId) => {
  if (response.output.generic) {
    if (response.output.generic.length > 0) {
      if (response.output.generic[0].response_type === 'text') {
        console.log(response.output.generic[0].text);
      }
    }
  }

  service.deleteSession({
    assistantId,
    sessionId,
  }).catch((err) => {
    console.log(err);
  });
};

const sendMessage = (messageInput, sessionId) => {
  service
    .message({
      assistantId,
      sessionId,
      input: messageInput,
    })
    .then((res) => {
      processResponse(res.result, sessionId);
    }).catch((err) => {
      console.log(err);
    });
};

const session = () => {
  service.createSession({
    assistantId,
  }).then((res) => {
    const sessionId = res.result.session_id;

    sendMessage({
      messageType: 'text',
      text: 'test',
    }, sessionId);
  }).catch((err) => {
    console.log(err);
  });
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
