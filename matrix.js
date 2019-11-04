class Matrix {
	constructor(rows, cols, random=false){
		this.rows = rows;
		this.cols = cols;
		this.data = new Array(rows).fill().map(()=>new Array(cols).fill().map(()=>random?Math.random()*2-1:0))
	}
	map(callback){
		const m = new Matrix(this.rows, this.cols);
		for(let i=0;i<this.rows;i++){
			for(let j=0;j<this.cols;j++){
				m.data[i][j] = callback(this.data[i][j], i, j, this.data);
			}
		}
		return m;
	}
	static __require_matrix__(m, arg=1, ret=null){
		if(!(m instanceof Matrix)) throw new Error(`Argument error: Argument ${arg} must be a matrix`); return ret === null ? m : ret;
	}
	static __nbyn_operation__(m1, m2, operation){
		if(!(Matrix.__require_matrix__(m1, 1).rows === Matrix.__require_matrix__(m2, 2).rows && m1.cols === m2.cols))
			throw new Error("Operation error: Dimension unmatched!");
		return new Matrix(m1.rows, m1.cols).map((_, i, j) => operation(m1.data[i][j], m2.data[i][j]));
	}
	static add(m1, m2){
		return Matrix.__nbyn_operation__(m1, m2, (a, b) => a + b);
	}
	static sub(m1, m2){
		return Matrix.__nbyn_operation__(m1, m2, (a, b) => a - b);
	}
	static hadamart(m1, m2){
		return Matrix.__nbyn_operation__(m1, m2, (a, b) => a * b);
	}
	static transpose(m){
		return new Matrix(Matrix.__require_matrix__(m).cols, m.rows).map((_, i, j) => m.data[j][i]);
	}
	static mult(m1, m2){
		if(!(Matrix.__require_matrix__(m1, 1).cols === Matrix.__require_matrix__(m2, 2).rows))
			throw new Error("Invalid operation: Column of argument 1 must match row of argument 2!");
		const [rows, cols, n] = [m1.rows, m2.cols, m1.cols];
		const m = new Matrix(rows, cols);
		for(let i=0;i<rows;i++){
			for(let j=0;j<cols;j++){
				for(let k=0;k<n;k++){
					m.data[i][j] += m1.data[i][k] * m2.data[k][j];
				}
			}
		}
		return m;
	}
	static from(arr){
		if(!(arr instanceof Array)) throw new Error("Argument error: Expecting 1d or 2d array as first argument!");
		let m = arr[0] instanceof Array ? new Matrix(arr.length, arr[0].length) : new Matrix(arr.length, 1);
		if(arr[0] instanceof Array) m = m.map((_, i, j) => arr[i][j]);
		else m = m.map((_, i) => arr[i]);
		return m;
	}
}