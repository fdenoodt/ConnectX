const config = {
  apiKey: "AIzaSyDdB0qAIxjCAutCYUpxrO6IFgrxIO4d8Is",
  authDomain: "connectx-ba73a.firebaseapp.com",
  databaseURL: "https://connectx-ba73a.firebaseio.com",
  projectId: "connectx-ba73a",
  storageBucket: "connectx-ba73a.appspot.com",
  messagingSenderId: "255736146698"
};
firebase.initializeApp(config);

let game;
const database = firebase.database();
const ref = firebase.database().ref('games/')

const createGame = () => {
  game = new Game()
}

const findGame = () => {
  ref.once('value').then(function (snapshot) {
    for (const key in snapshot.val()) {
      const foundGame = snapshot.val()[key]
      if (foundGame.player2 === undefined) {
        game = new Game(key)
        break;
      }
    }
    if (game == null)
      createGame()
  });
}

findGame()