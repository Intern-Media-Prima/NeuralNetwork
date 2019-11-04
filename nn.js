class NeuralLayer {
	constructor(input, output){
		this.weights = new Matrix(output, input, true);
		this.bias = new Matrix(output, 1, true);
	}
}

class NeuralNetwork {
	constructor(...nodes){
		if(!(nodes.length >= 2)) throw new Error("Invalid argument: Network must have at least two layers!");
		this.nodes = nodes;
		this.layers = [];
		for(let i=0;i<nodes.length-1;i++){
			this.layers.push(new NeuralLayer(nodes[i], nodes[i+1]));
		}
	}
	feedforward(input_arr){
		let output = Matrix.from(input_arr);
		for(let layer of this.layers){
			output = Matrix.add(Matrix.mult(layer.weights, output), layer.bias);
		}
		return output;
	}
}