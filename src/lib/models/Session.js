import Storage from 'Lib/Storage';

export default class Session {

  static get NAMESPACE() { return Storage.encryptedModelName("session"); }

  static async read() {
    return Storage.load(Session.NAMESPACE);
  }

  static async write(session) {
    console.log("write old session", session);
    let oldSession = await Session.read();
    if(oldSession != null){
      for (var key in oldSession) {
        if(oldSession[key] != null && session[key] == null){
          session[key] = oldSession[key];
        }
      }
    }
    return Storage.write(Session.NAMESPACE, session);
  }

  static async update(key, value){
    let session = await Session.read();
    if(session == null){
      session = {};
    }
    session[key] = value;
    return Storage.write(Session.NAMESPACE, session);
  }

  static async destroy() { 
    return Storage.remove(Session.NAMESPACE);
  }

}