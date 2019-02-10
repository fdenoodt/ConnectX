class Game {
  constructor(key) {
    this.ref = null;
    this.tokens = []
    this.display = new Display()
    this.p1;
    this.whosTurn;

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
        player1: 'p1',
        player2: null,
        tokens: null,
        turn: 'p1'
      })
      this.p1 = true
    }
    this.listenForTurn()
    this.listenForTokenChanges()
  }

  listenForTurn() {
    const that = this
    this.ref.child('/turn').on('value', function (data) {
      that.whosTurn = data.val();
    })
  }

  listenForTokenChanges() {
    const that = this
    this.ref.child('/tokens').on('child_added', function (data) {
      const owner = data.val().owner
      const r = data.val().row
      const c = data.val().col

      if ((owner == 'p1' && !that.p1) || (owner == 'p2' && that.p1)) {
        const token = new Token(owner, r, c)
        that.tokens.push(token)
        that.display.displayToken(token)
      }
    });
  }

  placeToken(i, j) {
    const isMe = this.p1 ? 'p1' : 'p2'
    const that = this
    if (isMe == this.whosTurn) {
      const usedSpots = this.tokens.filter(function (token) { return (token.Row == i && token.Col == j); });
      if (usedSpots.length == 0) {
        const token = new Token(this.p1 ? 'p1' : 'p2', i, j) //kind of redundant, but no need to wait for internet connection now
        this.tokens.push(token)

        //Store in firebase
        this.ref.child('/tokens').push(token)
        this.ref.update({ turn: (that.p1 ? 'p2' : 'p1') })

        this.display.displayToken(token)
      }
      else {
        //There is a token on that spot already
      }
    }
  }
}