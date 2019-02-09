class Game {
  constructor(key) {
    this.ref = null;
    this.tokens = []
    this.display = new Display()
    this.p1;

    if (key != null) { //joining game
      this.ref = firebase.database().ref('games/' + key)
      const updates = {};
      updates['player2'] = 'p2';
      this.ref.update(updates)
      this.p1 = false
    }
    else {
      this.ref = ref.push();
      this.ref.set({
        player1: "p1",
        player2: null,
        tokens: null,
      })
      this.p1 = true
    }
  }

  placeToken(i, j) {
    var usedSpots = this.tokens.filter(function (token) { return (token.Row == i && token.Col == j); });
    if (usedSpots.length == 0) {
      const token = new Token(this.p1 ? 'p1' : 'p2', i, j)
      this.tokens.push(token)
      this.ref.child('/tokens').push(token)
    }
    else {
      //There is a token on that spot already
    }
  }
}