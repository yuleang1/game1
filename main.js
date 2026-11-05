const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

let score=0;
const scoreEle=document.querySelector('span');

class Player {
  constructor(x, y, velocity, color) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, 30, 30);
    c.fill();
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

class Coin {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fill();
  }
}

x = innerWidth / 2;
y = innerHeight / 2;

const player = new Player(x, y, { x: 0, y: 0 }, "yellow");
const coins = [];
player.draw();

let displayCoinId;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  coins.forEach((coin, index) => {
    coin.draw();
    const distance = Math.hypot(
      coin.x - (player.x + 15),
      coin.y - (player.y + 15)
    );
      if (distance < coin.radius + 15) {
        coins.splice(index, 1);
        score++;
        scoreEle.innerHTML=score;
      }
  });
}

animate();

function sqwanCoin() {
  setInterval(() => {
    let radius = 20;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius + 2) + radius;
    let color = `hsl(${Math.random() * 360}, 50%,50%)`;
    coins.push(new Coin(x, y, radius, color));
  }, 3000);
}

addEventListener("keydown", (e) => {
  c.fillStyle = "rgba(0,0,0)";
  c.clearRect(0, 0, canvas.width, canvas.height);
  let key = e.key;
  let velocity;
  if (key === "d") {
    player.velocity = {
      x: 10,
      y: 0,
    };
    player.update();
  } else if (key === "s") {
    player.velocity = {
      x: 0,
      y: 10,
    };
    player.update();
  } else if (key === "a") {
    player.velocity = {
      x: -10,
      y: 0,
    };
    player.update();
  } else if (key === "w") {
    player.velocity = {
      x: 0,
      y: -10,
    };
    player.update();
  } else {
    player.velocity = {
      x: 0,
      y: 0,
    };
    player.update();
  }
});

animate();
sqwanCoin();

