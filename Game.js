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
        const token = that.saveTokenLocally(owner, r, c)
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
        const token = that.saveTokenLocally(this.p1 ? 'p1' : 'p2', i, j)

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

  saveTokenLocally(owner, row, col) {
    const token = new Token(owner, row, col) //kind of redundant, but no need to wait for internet connection now
    this.tokens.push(token)
    this.checkForWinner(token)
    return token
  }

  checkForWinner(token) {
    const required = 4 - 1 //-1 becuse center token isn't counted in total
    const totalRight = this.findTokens(1, 0, token.Row, token.Col, token.Owner, 0)
    const totalLeft = this.findTokens(-1, 0, token.Row, token.Col, token.Owner, 0)

    const totalUp = this.findTokens(0, -1, token.Row, token.Col, token.Owner, 0)
    const totalDown = this.findTokens(0, 1, token.Row, token.Col, token.Owner, 0)

    const totalLeftDown = this.findTokens(-1, 1, token.Row, token.Col, token.Owner, 0)
    const totalRightUp = this.findTokens(1, -1, token.Row, token.Col, token.Owner, 0)

    const totalLeftUp = this.findTokens(-1, -1, token.Row, token.Col, token.Owner, 0)
    const totalRightDown = this.findTokens(1, 1, token.Row, token.Col, token.Owner, 0)

    if (totalLeft + totalRight >= required) //3 = 4 tokens because 
      console.log('win')
    else if (totalUp + totalDown >= required)
      console.log('win')
    else if (totalLeftDown + totalRightUp >= required)
      console.log('win')
    else if (totalLeftUp + totalRightDown >= required)
      console.log('win')
  }

  //horizontal:   -1 = left
  //               0 = none
  //               1 = right
  //vertical:     -1 = up
  //               0 = none
  //               1 = down
  findTokens(horizontal, vertical, row, col, owner, countFound) {
    const nextCol = col + horizontal
    const nextRow = row + vertical

    //todo from one owner only
    const usedSpot = this.tokens.filter(function (token) { return (token.Row == nextRow && token.Col == nextCol && token.Owner == owner); })[0];
    if (usedSpot == undefined) //no token found
      return countFound
    else
      return this.findTokens(horizontal, vertical, nextRow, nextCol, ++countFound)
  }
}