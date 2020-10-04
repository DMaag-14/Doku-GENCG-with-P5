let cols;
let rows;
let current = [];
let previous = [];
let damping = 0.98;
let dPos;
let counter = 100;
let jumping = false;

function mouseDragged(){
	current[mouseX][mouseY] = 255;
}

function setup() {
	pixelDensity(1);
	createCanvas(800, 800);
	cols = 800;
	rows = 800;
	dPos = createVector(800,400);
	let dolphin1 = new dolphin(dPos.x, 400);
	for(let i = 0; i < cols; i++){
		current[i] = [];
		previous[i] = [];
		for(let j = 0; j < rows; j++){
			current[i][j] = 0;
			previous[i][j] = 0;
		}
	}
	previous[100][100] = 255;

}

function draw() {
	background(0);
	//dolphin1.move();
	loadPixels();
	for(let i = 1; i < cols - 1; i++){
		for(let j = 1; j < rows - 1; j++){
			current[i][j] = (
					previous[i-1][j] + previous[i+1][j] +
					previous[i][j-1] + previous[i][j+1] +
					previous[i-1][j-1] + previous[i+1][j-1] +
					previous[i-1][j+1] + previous[i+1][j+1]) / 4 - current[i][j];
			current[i][j] = current[i][j] * damping;
			let index = (i + j * cols) * 4;
			pixels[index + 0] = current[i][j]*255;
			pixels[index + 1] = current[i][j]*255;
			pixels[index + 2] = current[i][j]*255;
			pixels[index + 3] = 255;
		}
	}
	updatePixels();
	let temp = previous;
	previous = current;
	current = temp;
}


class dolphin{
	constructor(x, y){
		strokeWeight(0);
		fill(255);
		//body
		ellipse(x, y, 80, 20);
		//tail
		//triangle(x+20, y-6, x+20, y+6, x+65,y);
		//ellipse(x +60, y, 10, 20);
	}

}

function waterAni(){
	loadPixels();
	for(let i = 1; i < cols - 1; i++){
		for(let j = 1; j < rows - 1; j++){
			current[i][j] = (
					previous[i-1][j] + previous[i+1][j] +
					previous[i][j-1] + previous[i][j+1] +
					previous[i-1][j-1] + previous[i+1][j-1] +
					previous[i-1][j+1] + previous[i+1][j+1]) / 4 - current[i][j];
			current[i][j] = current[i][j] * damping;
			let index = (i + j * cols) * 4;
			pixels[index + 0] = current[i][j]*255;
			pixels[index + 1] = current[i][j]*255;
			pixels[index + 2] = current[i][j]*255;
			pixels[index + 3] = 255;
		}
	}
	updatePixels();
}
