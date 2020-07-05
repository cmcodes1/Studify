import firebase, { database } from 'firebase';



export default class Firebase {
    static auth;

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = Firebase.auth();
    }
}