var canvas_width = 100;
var canvas_height = 700;
var max_iterations = 100;
var iterations = 0;
var color = 0;
var points = []

function setup() {
    createCanvas(canvas_width, canvas_height);
    for (var x = 0; x < canvas_width; x++) {
        points[x] = []
        for (var y = 0; y < canvas_height; y++) {
            points[x].push_back([0,0])
        }
    }
}

function draw() {
    noFill();
    stroke(color)
        iterate(points, color);
    }
    color = color + 2;
    iterations = iterations + 1;
    console.log("iterated");
    if (iterations < max_iterations) {
        noloop();
    }
    
}

function iterate(points) {
    for (var xi = 0; xi < canvas_width; xi++) {
        var scaled_x = (xi / canvas_width) * 3.5 - 2.5; # from -2.5 to 1
        for (var yi = 0; yi < canvas_height; yi++) {
            var scaled_y = (yi / canvas_height) * 2 - 1; # from -1 to 1
            var x = points[xi][yi][0]
            var y = points[xi][yi][1]
            if (x*x + y*y < 4) {
                points[xi][yi][0] = x*x - y*y + scaled_x;
                points[xi][yi][1] = 2*x*y + scaled_y;
                point(xi, yi);
            }
        }
    }
}
