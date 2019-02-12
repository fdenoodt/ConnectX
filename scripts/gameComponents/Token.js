class Token {
  constructor(owner, row, col) {
    this.owner = owner
    this.row = row
    this.col = col
  }

  get Owner() {
    return this.owner
  }

  get Row() {
    return this.row
  }

  get Col() {
    return this.col
  }

  set Row(value) {
    this.row = value
  }

  set Col(value) {
    this.col = value
  }

}