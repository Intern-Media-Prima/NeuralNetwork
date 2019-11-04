class NeuralLayer {
	constructor(input, output){
		this.weights = new Matrix(output, input, true);
		this.bias = new Matrix(output, 1, true);
	}
}

class ActivationFunction {
	constructor(activator, deactivator){
		this.activator = activator;
		this.deactivator = deactivator;
	}
	static get Sigmoid(){ return new ActivationFunction(x => 1 / (1 + Math.exp(-x)), y => 1 / (1 + Math.exp(-y))); }
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
	feedforward(input_arr, activation_function=ActivationFunction.Sigmoid){
		let output = Matrix.from(input_arr);
		let arrays = [];
		for(let layer of this.layers){
			output = Matrix.mult(layer.weights, output);
			output = Matrix.sub(output, layer.bias);
			arrays.push(output);
			output = output.map(activation_function.activator);
			console.table(output.data);
		}
		return output;
	}
}