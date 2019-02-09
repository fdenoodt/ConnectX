class Game {
  constructor() {
    this.ref = ref.push();
    console.log(this.ref.key);

    this.ref.set({
      player1: "p90",
      player2: "",
      tokens: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    })
  }
}