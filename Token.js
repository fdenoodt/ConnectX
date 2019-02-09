class Token {
  constructor(owner, row, col) {
    this._owner = owner
    this._row = row
    this._col = col
  }

  get Owner() {
    return this._owner
  }

  get Row() {
    return this._row
  }
  
  get Col() {
    return this._col
  }

  set Row(value) {
    this._row = value
  }

  set Col(value) {
    this._col = value
  }

}