var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
function getRandomInt(min, max){
	return Math.floor(Math.random()*(max - min + 1) + min);
}

var colors = [
	'#2E112D',
	'#540032',
	'#1127FF',
	'#4E9CFF',
	'#F0433A',	
];
var mouse = {
	x: canvas.height/2,
	y: canvas.width/2
};
addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
	});

function getRandomColor(){
	return colors[getRandomInt(0, 6)];
}
console.log(canvas);

canvas.height = window.innerHeight+20;
canvas.width = window.innerWidth+20;

function Particle(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = getRandomColor();
	this.rad = Math.random()*Math.PI*2;
	
	this.distFromCenter = getRandomInt(40, canvas.width);
	this.angv = 2/this.distFromCenter;
	this.lastMouse = {
		x: x,
		y: y
	}
	this.update = function(){
		const lastPoint = {
			x: this.x,
			y: this.y
		}
		this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
		this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
		this.rad += this.angv;
		this.x = 10 + Math.cos(this.rad) * this.distFromCenter + this.lastMouse.x;
		this.y = 10 + Math.sin(this.rad) * this.distFromCenter + this.lastMouse.y;
		this.draw(lastPoint);
	};

	this.draw = function(lastPoint){
		c.beginPath();
		// c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		// c.fill();
		// c.fillStyle = this.color;

		c.strokeStyle = this.color;
		c.lineWidth = this.r;
		c.moveTo(lastPoint.x, lastPoint.y);
		c.lineTo(this.x, this.y);
		c.stroke();
		c.closePath();

	}
}

var particles = [];

function init(){
	particles = [];
	for(var i = 0; i < 1000; i++){
		var r = getRandomInt(1,4);
		var x = getRandomInt(r, canvas.width-r);
		var y = getRandomInt(r, canvas.height-r);
		particles.push(new Particle(mouse.x, mouse.y, r));
	}
}

function animate(){
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(10, 10, 10, 0.5)'
	c.fillRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < particles.length; i++){
		particles[i].update();
	}

}

init();
animate();