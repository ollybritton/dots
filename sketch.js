let DOTS = [];
let DOT_SIZE = 5;

let curr_num = 2;
let param = 20;

class Dot {
  constructor(pos, num) {
    this.pos = pos;

    this.num = num;

    this.dir = createVector(0, 0);
  }

  prepareMove() {
    this.dir = createVector(0, 0);

    for (let i = 0; i < DOTS.length; i++) {
      let friend = DOTS[i];

      let friendDir = createVector(
        friend.pos.x - this.pos.x,
        friend.pos.y - this.pos.y
      );

      let friendDist = friendDir.mag();
      friendDir.normalize();

      if (friendDist == 0) {
        continue;
      }

      let component = friendDir;

      if (friendDist < 25) {
        component.mult(-0.2);
      } else {
        component.mult(1);
      }

      this.dir.add(component);
    }
  }

  move() {
    this.pos.add(this.dir);
  }

  draw() {
    let speed = log(this.dir.mag());

    fill(color(255 / speed, 255 / speed, 255));

    ellipse(this.pos.x, this.pos.y, DOT_SIZE);
  }
}

function newDot() {
  var pos = createVector(mouseX, mouseY);

  DOTS.push(new Dot(pos, curr_num));
  curr_num += 1;
}

function primeFactors(n) {
  let arr = {};
  let i = 2;

  while (i <= n) {
    if (n % i == 0) {
      n = n / i;
      arr[i] = arr[i] == undefined ? 1 : arr[i] + 1;
    } else {
      i++;
    }
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);

  // setInterval(() => {
  //   var pos = createVector(Math.random() * width, Math.random() * height);

  //   DOTS.push(new Dot(pos, curr_num));
  //   curr_num += 1;
  // }, 200);
}

function draw() {
  background(0, 20);
  noStroke();

  for (let dot of DOTS) {
    dot.prepareMove();
  }

  for (let dot of DOTS) {
    dot.move();
    dot.draw();
  }
}

function mouseClicked() {
  newDot();
}

function mouseDragged() {
  newDot();
}
