// ! Прототипный стиль
function Figure(x, y, color, opacity = 1) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.opacity = opacity;
}

Figure.prototype.draw = function () {
	console.log("Figure method");
};

function Line(x, y, x2, y2, color, opacity) {
	Figure.call(this, x, y, color);
	this.x2 = x2;
	this.y2 = y2;
}

Line.prototype.__proto__ = Figure.prototype;

Line.prototype.draw = function (ctx) {
	Figure.prototype.draw.call(this);
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.moveTo(this.x, this.y); //передвигаем перо
	ctx.lineTo(this.x2, this.y2); //рисуем линию
	ctx.stroke();
};

function Zigzag(x, y, x2, y2, color, opacity, step) {
	Figure.call(this, x, y, color);
	this.x2 = x2;
	this.y2 = y2;
	this.step = step;
}

Zigzag.prototype.__proto__ = Figure.prototype;

Zigzag.prototype.draw = function (ctx) {
	Figure.prototype.draw.call(this);
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	let counter = 0;

	while (this.x2 <= 700) {
		ctx.moveTo(this.x, this.y); //передвигаем перо
		ctx.lineTo(this.x2, this.y2); //рисуем линию

		if (counter % 2 == 0) {
			this.y += this.step;
			this.y2 -= this.step;
		} else {
			this.y -= this.step;
			this.y2 += this.step;
		}
		this.x += this.step;
		this.x2 += this.step;
		counter += 1;
	}
	ctx.stroke();
};

function Rect(x, y, width, height, color, opacity) {
	Figure.call(this, x, y, color, opacity);
	this.width = width;
	this.height = height;
}

Rect.prototype.__proto__ = Figure.prototype;

Rect.prototype.draw = function (ctx) {
	Figure.prototype.draw.call(this);
	ctx.fillStyle = this.color;
	ctx.globalAlpha = this.opacity;
	ctx.fillRect(this.x, this.y, this.width, this.height); //передвигаем перо
};

function Circle(x, y, radius, color, opacity) {
	Figure.call(this, x, y, color, opacity);
	this.radius = radius;
}

Circle.prototype.__proto__ = Figure.prototype;

Circle.prototype.draw = function (ctx) {
	Figure.prototype.draw.call(this);
	ctx.strokeStyle = this.color;
	ctx.globalAlpha = this.opacity;
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 12); //2 * Math.PI
	ctx.stroke();
	ctx.fill();
};

function Canvas(canvasId) {
	let canvas = document.getElementById(canvasId);
	this.ctx = canvas.getContext("2d");
}

Canvas.prototype.add = function (...rest) {
	for (let obj of rest) {
		if (obj instanceof Line) {
			obj.draw(this.ctx);
		} else if (obj instanceof Rect) {
			obj.draw(this.ctx);
		} else if (obj instanceof Circle) {
			obj.draw(this.ctx);
		} else if (obj instanceof Zigzag) {
			obj.draw(this.ctx);
		}
	}
};

let line1 = new Line(50, 250, 200, 200, "gray");
let line2 = new Line(50, 230, 200, 180, "gray");
let zigzag = new Zigzag(0, 0, 20, 20, "black", 1, 20);
let rect1 = new Rect(260, 130, 60, 120, "green", 0.3);
let rect2 = new Rect(280, 110, 120, 60, "purple", 0.3);
let rect3 = new Rect(380, 150, 80, 60, "yellow", 0.3);
let circle1 = new Circle(120, 120, 50, "blue", 0.3);
let circle2 = new Circle(100, 70, 30, "blue", 0.3);
let drawArea = new Canvas("canvas2D");
drawArea.add(line1, line2, zigzag, rect1, rect2, rect3, circle1, circle2);



// ! Сделал с синтаксисом классов
// class Figure {
// 	constructor(x, y, color, opacity = 1) {
// 		this.x = x;
// 		this.y = y;
// 		this.color = color;
// 		this.opacity = opacity;
// 	}

// 	draw() {
// 		console.log("Figure method");
// 	}
// }

// class Line extends Figure {
// 	constructor(x, y, x2, y2, color, opacity) {
// 		super(x, y, color, opacity);
// 		this.x2 = x2;
// 		this.y2 = y2;
// 	}

// 	draw(ctx) {
// 		super.draw();
// 		ctx.strokeStyle = this.color;
// 		ctx.beginPath();
// 		ctx.moveTo(this.x, this.y); //передвигаем перо
// 		ctx.lineTo(this.x2, this.y2); //рисуем линию
// 		ctx.stroke();
// 	}
// }

// class Zigzag extends Figure {
// 	constructor(x, y, x2, y2, color, opacity, step) {
// 		super(x, y, color, opacity);
// 		this.x2 = x2;
// 		this.y2 = y2;
// 		this.step = step;
// 	}

// 	draw(ctx) {
// 		super.draw();
// 		ctx.strokeStyle = this.color;
// 		ctx.beginPath();
// 		let counter = 0;

// 		while (this.x2 <= 700) {
// 			ctx.moveTo(this.x, this.y); //передвигаем перо
// 			ctx.lineTo(this.x2, this.y2); //рисуем линию

// 			if (counter % 2 == 0) {
// 				this.y += this.step;
// 				this.y2 -= this.step;
// 			} else {
// 				this.y -= this.step;
// 				this.y2 += this.step;
// 			}
// 			this.x += this.step;
// 			this.x2 += this.step;
// 			counter += 1;
// 		}
// 		ctx.stroke();
// 	}
// }

// class Rect extends Figure {
// 	constructor(x, y, width, height, color, opacity) {
// 		super(x, y, color, opacity);
// 		this.width = width;
// 		this.height = height;
// 	}

// 	draw(ctx) {
// 		super.draw();
// 		ctx.fillStyle = this.color;
// 		ctx.globalAlpha = this.opacity;
// 		ctx.fillRect(this.x, this.y, this.width, this.height); //передвигаем перо
// 	}
// }

// class Circle extends Figure {
// 	constructor(x, y, radius, color, opacity) {
// 		super(x, y, color, opacity);
// 		this.radius = radius;
// 	}

// 	draw(ctx) {
// 		super.draw();
// 		ctx.strokeStyle = this.color;
// 		ctx.globalAlpha = this.opacity;
// 		ctx.fillStyle = this.color;
// 		ctx.beginPath();
// 		ctx.arc(this.x, this.y, this.radius, 0, 12); //2 * Math.PI
// 		ctx.stroke();
// 		ctx.fill();
// 	}
// }

// class Canvas {
// 	constructor(canvasId) {
// 		let canvas = document.getElementById(canvasId);
// 		this.ctx = canvas.getContext("2d");
// 	}

// 	add(...rest) {
// 		for (let obj of rest) {
// 			if (obj instanceof Line) {
// 				obj.draw(this.ctx);
// 			} else if (obj instanceof Rect) {
// 				obj.draw(this.ctx);
// 			} else if (obj instanceof Circle) {
// 				obj.draw(this.ctx);
// 			} else if (obj instanceof Zigzag) {
// 				obj.draw(this.ctx);
// 			}
// 		}
// 	}
// }

// let line1 = new Line(50, 250, 200, 200, "gray");
// let line2 = new Line(50, 230, 200, 180, "gray");
// let zigzag = new Zigzag(0, 0, 20, 20, "black", 1, 20);
// let rect1 = new Rect(260, 130, 60, 120, "green", 0.3);
// let rect2 = new Rect(280, 110, 120, 60, "purple", 0.3);
// let rect3 = new Rect(380, 150, 80, 60, "yellow", 0.3);
// let circle1 = new Circle(120, 120, 50, "blue", 0.3);
// let circle2 = new Circle(100, 70, 30, "blue", 0.3);
// let drawArea = new Canvas("canvas2D");
// drawArea.add(line1, line2, zigzag, rect1, rect2, rect3, circle1, circle2);
