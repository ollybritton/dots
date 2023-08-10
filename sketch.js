let DOTS = [];
let DOT_SIZE = 10;

let curr_num = 2;

class Dot {
  constructor(pos, num) {
    this.pos = pos;

    this.num = num;
    this.factors = primeFactors(num);
    this.isPrime =
      Object.values(this.factors).length == 1 &&
      Object.values(this.factors)[0] == 1;

    console.log(num, this.isPrime);

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

      if (this.isPrime && friend.isPrime) {
        // Arrange primes into a sort of lattice

        if (friendDist <= 100) {
          component.mult(-2);
        } else {
          component.mult(1 / pow(friendDist, 1));
        }
      } else {
        // Have non primes attracted to primes based on their prime factors
        if (this.factors[friend.num] == undefined) {
          if (friend.isPrime) {
            component.mult(-2);
          } else {
            if (friendDist <= 10) {
              component.mult(-2);
            } else {
              component.mult(0);
            }
          }
        } else {
          if (friendDist <= 20) {
            component.mult(-2);
          } else {
            component.mult(friend.num);
          }
        }
      }

      this.dir.add(component);
    }
  }

  move() {
    this.pos.add(this.dir);
  }

  draw() {
    let speed = this.dir.mag();

    if (this.isPrime) {
      fill(color(255 / speed, 255, 255 / speed));
    } else {
      fill(color(255 / speed, 255 / speed, 255));
    }

    if (this.isPrime) {
      textSize(DOT_SIZE * 2);
    } else {
      textSize(DOT_SIZE);
    }

    text(this.num, this.pos.x, this.pos.y);
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
}

function draw() {
  background(0, 100);
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
