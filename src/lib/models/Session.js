import Storage from 'Lib/Storage';

export default class Session {

  static get NAMESPACE() { return Storage.encryptedModelName("session"); }

  static async read() {
      return Storage.load(Session.NAMESPACE);
  }

  static async write(session) {
    return Storage.write(Session.NAMESPACE, session);
  }

  static async destroy() { 
    return Storage.remove(Session.NAMESPACE);
  }

}