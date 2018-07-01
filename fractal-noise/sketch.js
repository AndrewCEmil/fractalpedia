var canvas_width = 700;
var canvas_height = 700;

function setup() {
  createCanvas(canvas_width, canvas_height);
}

//TODO summation for final result
function draw() {
  noFill();
  stroke(0);
  var num_points = canvas_width;
  var start_height = 0;
  var noise_smoother = .01;
  var noise_scalar = canvas_height / 3;
  var final_result_height = canvas_height - noise_scalar * 1.5;
  var pi = 3.14159;
  var height = 0;
  var num_lines = 5;
  var final_points = []
  for (i = 0; i < num_points; i++) {
    final_points.push(final_result_height)
  }
  for (j = 0; j < num_lines; j++) {
    var prev_height = noise(start_height) * noise_scalar + start_height;
    final_points[0] += prev_height;
    for(i = 1; i < num_points; i++) {
      height = noise(noise_smoother * i + start_height) * noise_scalar + start_height;
      line(i - 1, prev_height, i, height);
      prev_height = height;
      final_points[i] += height - start_height;
    }
    start_height += noise_scalar;
    noise_smoother = noise_smoother * 2;
    noise_scalar = noise_scalar / 2;
  }

  for (i = 1; i < num_points; i++) {
    line(i - 1, final_points[i-1], i, final_points[i]);
  }
  noLoop();
}
