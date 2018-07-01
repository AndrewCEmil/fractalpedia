var canvas_width = 700;
var canvas_height = 700;

function setup() {
  createCanvas(canvas_width, canvas_height);
}

function draw() {
  noFill();
  stroke(0)
  var num_iterations = 6;
  var center = canvas_width / 2;
  var points = [[canvas_width / 2 + 200, canvas_height / 2 + 200], [canvas_width / 2, canvas_height / 2 - 200], [canvas_width / 2 - 200, canvas_width / 2 + 200]]
  for (var i = 0; i < num_iterations; i++) {
    console.log("START POINTS: " + points);
    if (i == num_iterations - 1) {
        render(points);
    }
    points = create_new_points(points);
  }
  console.log("exiting")
  noLoop();
}

function render(points) {
  for (i = 0; i < points.length - 1; i++) {
    line(points[i][0], points[i][1], points[i+1][0], points[i+1][1])
  }
  line(points[points.length - 1][0], points[points.length - 1][1], points[0][0], points[0][1])
}

function create_new_points(points) {
    var new_points = []
    for (i = 0; i < points.length - 1; i++) {
        new_points = new_points.concat(create_sub_triangle(points[i], points[i+1]));
    }
    new_points = new_points.concat(create_sub_triangle(points[points.length-1], points[0]));
    return new_points
}

function create_sub_triangle(raw_a, raw_b) {
    var a = createVector(raw_a[0], raw_a[1]);
    var b = createVector(raw_b[0], raw_b[1]);
    var base = p5.Vector.sub(b, a);
    var second = base.copy().mult(1 / 3).add(a);
    var third = base.copy().normalize().mult(sqrt(base.mag()*base.mag()/12)).rotate(HALF_PI).add(base.copy().mult(1 / 2)).add(a);
    var fourth = base.copy().mult(2 / 3).add(a);
    return [raw_a, [second.x, second.y], [third.x, third.y], [fourth.x, fourth.y], raw_b]
}
