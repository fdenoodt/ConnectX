class Game {
  constructor(key) {
    if (key != null) { //joining game
      this.ref = firebase.database().ref('games/' + key)

      const updates = {};
      updates['player2'] = 'p2';
      this.ref.update(updates)
    }
    else {
      this.ref = ref.push();
      this.ref.set({
        player1: "p1",
        player2: null,
        tokens: null,
      })
    }
  }
}