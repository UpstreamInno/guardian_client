
// TODO: move this to a config manager, such as react-native-config
const CONFIG = {
  API_ENDPOINT: "https://www.myguardian.world/api"
}

function defaultHeaders(tokenValue) {
  let headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
  if (tokenValue) {
    headers.authorization = `Bearer ${tokenValue}`
  }

  return headers;
}

// User's imprecise region path
async function sendRegionPath({path, accessToken}) {
  const body = JSON.stringify({points: path});

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/path`, {
      method: 'POST',
      headers: defaultHeaders(accessToken),
      body,
    })

    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

async function getPath({accessToken}) {
  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/path`, {
      method: 'GET',
      headers: defaultHeaders(accessToken),
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

async function getMessages({accessToken}) {
  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/messages`, {
      method: 'GET',
      headers: defaultHeaders(accessToken),
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

async function ackMessage({messageId, accessToken}) {
  const body = JSON.stringify({ message_id: messageId });

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/messages/ack`, {
      method: 'POST',
      headers: defaultHeaders(accessToken),
      body,
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

async function signUp(phoneNumber) {
  const body = JSON.stringify({
    "phone_number": phoneNumber,
  });

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/sign_up`, {
      method: 'POST',
      headers: defaultHeaders(),
      body,
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

async function signIn({registrationId, registrationCode}) {
  const body = JSON.stringify({
    id: registrationId,
    code: registrationCode,
  });

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/sign_in`, {
      method: 'POST',
      headers: defaultHeaders(),
      body,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data["status"] !== "ok") {
        return reject(data.errors)
      } else {
        return resolve({
          accessToken: data["access_token"],
          refreshToken: data["refresh_token"],
        });
      }
      
    })
    .catch((error) => reject(error));
  });
};

// User's precise path
async function reportPath({pathId, points, accessToken}) {
  let body = { points };

  if (pathId) {
    body.path_id = pathId;
  }

  body = JSON.stringify(body);

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/report_path`, {
      method: 'POST',
      headers: defaultHeaders(accessToken),
      body,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors.length > 0) {
        return reject(errors);
      }

      return resolve({ pathId: data["path_id"] });
    })
    .catch((error) => reject(error));
  });
};

async function reportSurvey({pathId, accessToken}) {
  const body = JSON.stringify({
    path_id: pathId
  });

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/report_survey`, {
      method: 'POST',
      headers: defaultHeaders(accessToken),
      body,
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

async function reportTestResults({pathId, accessToken }) {
  const body = JSON.stringify({ 
    path_id: pathId
  });

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/report_test`, {
      method: 'POST',
      headers: defaultHeaders(accessToken),
      body,
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

export {
  getPath,
  sendRegionPath,
  signUp,
  signIn,
  reportSurvey,
  reportTestResults,
  reportPath,
  getMessages,
  ackMessage,
};