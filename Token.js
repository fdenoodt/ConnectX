class Token {
  constructor(owner, x, y) {
    this._owner = owner
    this._x = x
    this._y = y
  }

  get Owner() {
    return this._owner
  }

  get X() {
    return this._x
  }
  
  get Y() {
    return this._y
  }

  set X(value) {
    this._x = value
  }

  set Y(value) {
    this._y = value
  }

}