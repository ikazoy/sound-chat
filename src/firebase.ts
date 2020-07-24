import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA_6SN910Ry8czAxRR2FgcCmB9t4u8GY30',
  authDomain: 'sound-chat-5875a.firebaseapp.com',
  databaseURL: 'https://sound-chat-5875a.firebaseio.com',
  projectId: 'sound-chat-5875a',
  storageBucket: 'sound-chat-5875a.appspot.com',
  messagingSenderId: '1052142353738',
  appId: '1:1052142353738:web:0231122eeccb95832315b3',
}

firebase.initializeApp(firebaseConfig)

export default firebase
