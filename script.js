const config = {
  apiKey: "AIzaSyDdB0qAIxjCAutCYUpxrO6IFgrxIO4d8Is",
  authDomain: "connectx-ba73a.firebaseapp.com",
  databaseURL: "https://connectx-ba73a.firebaseio.com",
  projectId: "connectx-ba73a",
  storageBucket: "connectx-ba73a.appspot.com",
  messagingSenderId: "255736146698"
};
firebase.initializeApp(config);

const database = firebase.database();
const ref = firebase.database().ref('games/')
let game;
const createGame = () => {
  game = new Game()
}

createGame()