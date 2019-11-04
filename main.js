const canvas = document.querySelector("canvas#screen");
const ctx = canvas.getContext('2d');

const nn = new NeuralNetwork(2, 2, 3);
const out = nn.feedforward([1.5, 2.5]);
console.log(out);