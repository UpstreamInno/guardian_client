
// TODO: move this to a config manager, such as react-native-config
const CONFIG = {
  API_ENDPOINT: "https://www.myguardian.world/api"
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8'
}

async function sendPath(path) {
  const body = JSON.stringify({points: path});

  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/path`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body,
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  });
};

async function getPath() {
  return new Promise((resolve, reject)=>{
    fetch(`${CONFIG.API_ENDPOINT}/users/path`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
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
      headers: DEFAULT_HEADERS,
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
      headers: DEFAULT_HEADERS,
      body,
    })
    .then((response) => response.json())
    .then((data) => {
      return resolve({
        sessionId: data["user_id"],
      })
    })
    .catch((error) => reject(error));
  });
};

export {
  getPath,
  sendPath,
  signUp,
  signIn,
};