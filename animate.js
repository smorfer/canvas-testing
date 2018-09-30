var canvas = document.getElementById('canvas');
var input = document.getElementById('input');
var button = document.getElementById('button');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var mouseX = 0;
var mouseY = 0;
var max_radius = 50;

var colors = [
        "#f44336",
        "#00796b",
        "#3949ab",
        "#7b1fa2",
        "#546e7a",
        "#bf360c"
];

function Circle(x , y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.start_radius = radius;
        this.color = color;
        this.draw = () => {

                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.closePath();

                c.strokeStyle = this.color;
                c.fillStyle = this.color;
                c.lineWidth = 3;
                c.stroke();
                c.fill();

        }
        this.update = () => {

                var distance_to_mouse = Math.sqrt((this.x - mouseX)**2 + (this.y - mouseY)**2);
                if (distance_to_mouse < 100 && this.radius < max_radius) {
                        this.radius += 1;
                } else if (distance_to_mouse >= 100 && this.radius > this.start_radius) {
                        this.radius -= 1;
                }
                if(this.x-this.radius <= 0 || this.x+this.radius >= window.innerWidth) {
                        this.dx = -this.dx;
                }
                if (this.y-this.radius <= 0 || this.y+this.radius >= window.innerHeight) {
                        this.dy = -this.dy;
                }
                this.x += this.dx
                this.y += this.dy;

        }


}

var circles = [];

function init(quantity) {

        circles = [];

        if (quantity === undefined) {
                quantity = 500;
        }

        for (var i = 0; i < quantity; i++) {

                var radius = Math.random()* 10+1;
                var x = Math.random()*(window.innerWidth-radius*2)+radius;
                var y = Math.random()*(window.innerHeight-radius*2)+radius;
                var dx = (Math.random()-0.5)*4;
                var dy = (Math.random()-0.5)*5;
                var color = colors[Math.floor(Math.random()*colors.length)];
                circles.push(new Circle(x, y, radius, dx, dy, color));
        }
}

init();

function animate() {
        requestAnimationFrame(animate);

        c.clearRect(0,0,window.innerWidth, window.innerHeight);
        circles.forEach((element) => {

                element.update();
                element.draw();

        });



}
window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
});

canvas.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

});

button.addEventListener('click', () => {
        var parsed_input = parseInt(input.value, 10);
        if (!isNaN(parsed_input)) {
                init(parsed_input);
        }

})

animate();
