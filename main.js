const canvas = document.querySelector("canvas#screen");
const ctx = canvas.getContext('2d');

const nn = new NeuralNetwork(2, 2, 4);
console.log(nn);
const out = nn.feedforward([2, 4]);
console.log(out);