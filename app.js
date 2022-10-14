const body = document.getElementById('body');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1920;
const canvasHeight = 1080;

const page = {
  currentPage: 1,
  totalPages: 4,
  waiting: false,
  delay: 1000,
};

const STEPS = 2;
const PARTICLE_COUNT = 50;
const SPEED = 0.04;
const MAX_SPEED = SPEED * 70;
const CLICK_SPEED = 3;
const COLOR = 0.1;
const SATURATION_STEP = 0.2;
const SATURATION = 70;
const MAX_SATURATION = 100;
const BOUNCINESS = 100;

let particleSpeed = SPEED;
let particleColor = COLOR;
let particleSaturation = SATURATION;
let maxDir = MAX_SPEED;
const minStarSize = 4;
const maxStarSize = 20;
let alphaAdjuster = 0.1;
const maxJiggle = 0.1;
const gravConstant = 2;
const initMouseMass = maxStarSize * 200;
const initPadding = maxStarSize * 5;
const zonePadding = 50;

let nameColorTimer = 0;

const starArr = [];

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  isMouseDown: false,
};

initCanvas();
//EVENT LISTENERS
window.addEventListener('resize', resizeHandler);
window.addEventListener('wheel', (e) => {
  if (!page.waiting) {
    if (e.wheelDeltaY < 0) {
      if (page.currentPage >= page.totalPages) {
        page.currentPage = 1;
        console.log('+');
      } else {
        page.currentPage++;
        console.log('++');
      }
      page.waiting = true;
    } else if (page.currentPage >= page.totalPages) {
      page.currentPage = 1;
      console.log('-');
      page.waiting = true;
    } else {
      page.currentPage++;
      page.waiting = true;
      console.log('--');
    }
    setTimeout(() => (page.waiting = false), page.delay);
  }
});
window.addEventListener('mousedown', mousedownHandler);
window.addEventListener('mouseup', mouseupHandler);
window.addEventListener('touchstart', (e) => {
  mouse.isMouseDown = true;
  mouse.x = e.changedTouches[0].clientX;
  mouse.y = e.changedTouches[0].clientY;
});
window.addEventListener('touchend', (e) => {
  mouse.isMouseDown = false;
  mouse.x = e.changedTouches[0].clientX;
  mouse.y = e.changedTouches[0].clientY;
});

//APP ENGINE
const Engine = setInterval(() => app(), STEPS);

//MAIN APP
function app() {
  //clear screen
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (mouse.isMouseDown === true) {
    particleSpeed = SPEED * CLICK_SPEED;
    particleColor = COLOR * CLICK_SPEED;
    particleSaturation > MAX_SATURATION
      ? (particleSaturation = MAX_SATURATION)
      : (particleSaturation += SATURATION_STEP);
    maxDir = MAX_SPEED * 1.3;
  } else {
    particleSpeed = SPEED;
    particleColor = COLOR;
    particleSaturation < SATURATION
      ? (particleSaturation = SATURATION)
      : (particleSaturation -= SATURATION_STEP);
    maxDir = MAX_SPEED;
  }

  //track mouse position
  window.onmousemove = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  };
  window.ontouchmove = (e) => {
    mouse.x = e.changedTouches[0].clientX;
    mouse.y = e.changedTouches[0].clientY;
  };

  for (let i = 0; i < starArr.length; i++) {
    // if (mouse.isMouseDown === true) {
    applyForce(mouse, starArr[i]);

    // } else {
    //calculate paricle velocity during no force
    //   particleSpeed = SPEED;
    //   window.onmousemove = null;
    //   window.ontouchmove = null;
    //   starArr[i].dirX += getRandomArbitrary(-maxJiggle, maxJiggle);
    //   starArr[i].dirY += getRandomArbitrary(-maxJiggle, maxJiggle);
    // }

    // move particle
    moveParticle(starArr[i]);
    //Set screen behaviour - Wrap or Bounce
    screenBounce(starArr[i]);
    // screenWrap(starArr[i]);

    //Draw to canvas
    drawParticle(starArr[i]);
  }
}

//INITIALIZATION
function initCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  initParticles();
}

// CALCULATING "GRAVITATIONAL" FORCE
function applyForce(player, object) {
  let radian = Math.atan2(player.x - object.x, player.y - object.y);

  // Attraction For Screen Wrap
  // if (
  //   Math.abs(player.x - object.x + window.innerWidth) <
  //     Math.abs(player.x - object.x) / 2 ||
  //   Math.abs(player.x - object.x - window.innerWidth) <
  //     Math.abs(player.x - object.x) / 2 ||
  //   Math.abs(player.y - object.y + window.innerHeight) <
  //     Math.abs(player.y - object.y) / 2 ||
  //   Math.abs(player.y - object.y - window.innerHeight) <
  //     Math.abs(player.y - object.y) / 2
  // ) {
  //   radian = -radian;
  // }
  // console.log(Math.cos(radian));

  // Check For Collision
  // for (let i = 0; i < starArr.length; i++) {
  //   const object1 = starArr[i];

  //   if (
  //     object != object1 &&
  //     distBetweenPoints(object.x, object.y, object1.x, object1.y) <=
  //       object.size + object1.size
  //   ) {
  //     radian = Math.atan2(object.x - object1.x, object.y - object1.y);
  //     object.x += object1.size * Math.sin(radian);
  //     object.y += object1.size * Math.cos(radian);
  //     //  Apply Force
  //     object.dirX +=
  //       Math.sin(radian) *
  //       particleSpeed *
  //       BOUNCINESS *
  //       (object1.size / object.size);
  //     object.dirY +=
  //       Math.cos(radian) *
  //       particleSpeed *
  //       BOUNCINESS *
  //       (object1.size / object.size);
  //   } else {
  //     radian = Math.atan2(player.x - object.x, player.y - object.y);
  //   }
  // }
  //  Apply Force
  object.dirX += Math.sin(radian) * particleSpeed;
  object.dirY += Math.cos(radian) * particleSpeed;
}

// CREATE PARTICLES
function initParticles() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    starArr.push({
      x: getRandomArbitrary(initPadding, window.innerWidth - initPadding),
      y: getRandomArbitrary(initPadding, window.innerHeight - initPadding),
      dirX: getRandomArbitrary(-MAX_SPEED, MAX_SPEED),
      dirY: getRandomArbitrary(-MAX_SPEED, MAX_SPEED),
      size: getRandomArbitrary(minStarSize, maxStarSize),
      h: getRandomArbitrary(160, 200),
      s: getRandomArbitrary(80, 100),
      l: getRandomArbitrary(50, 70),
      alpha: getRandomArbitrary(0.1, 1),
      isPulledIn: false,
      isPulledInRepeat: false,
    });
  }
}
1;

// CALCULATE PARTICLE SPEED
function moveParticle(particle) {
  //Set Max Particle Speed Limit
  if (particle.dirX < -maxDir) particle.dirX = -maxDir;
  if (particle.dirX > maxDir) particle.dirX = maxDir;
  if (particle.dirY < -maxDir) particle.dirY = -maxDir;
  if (particle.dirY > maxDir) particle.dirY = maxDir;

  //Set Particle Speed
  particle.x += particle.dirX;
  particle.y += particle.dirY;
}

// DRAW PARTICLES
function drawParticle(particle) {
  particle.h += particleColor;
  ctx.beginPath();
  ctx.fillStyle = `hsla(${particle.h},${particleSaturation}%,${particle.l}%,${
    particle.alpha * alphaAdjuster
  })`;
  //   ctx.strokeStyle = `hsla(${particle.h},${particle.s}%,${particle.l}%,${
  //     particle.alpha * alphaAdjuster
  //   })`;
  ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI, false);
  ctx.fill();
  //   ctx.stroke();
  ctx.closePath();
}

// GET RANDOM NUMBER BETWEEN 2 VALUES
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//FIND DISTANCE BETWEEN 2 POINTS//
function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// SCREEN WRAP BEHAVIOUR
function screenWrap(item) {
  if (item.x > window.innerWidth) item.x = item.x - window.innerWidth;
  if (item.x < 0) item.x = item.x + window.innerWidth;
  if (item.y < 0) item.y = item.y + window.innerHeight;
  if (item.y > window.innerHeight) item.y = item.y - window.innerHeight;
}
function screenBounce(item) {
  if (item.x + item.size >= window.innerWidth) item.dirX = -item.dirX;
  if (item.x <= 0) item.dirX = -item.dirX;
  if (item.y <= 0) item.dirY = -item.dirY;
  if (item.y + item.size >= window.innerHeight) item.dirY = -item.dirY;
}

//HANDLERS METHODS
function resizeHandler() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  starArr.forEach((particle) => drawParticle(particle));
}
function mousedownHandler(e) {
  e.preventDefault();
  mouse.isMouseDown = true;
  mouse.x = e.x;
  mouse.y = e.y;
}
function mouseupHandler(e) {
  e.preventDefault();
  mouse.isMouseDown = false;
}

function changePage(currentPage, totalPages, direction = 1, limit = 300) {
  let waiting = false;
  return function () {
    if (!waiting) {
      if (direction === 1) {
        if (currentPage >= totalPages) {
          currentPage = 1;
          console.log('+');
        } else {
          currentPage++;
          console.log('++');
        }
      } else if (currentPage >= totalPages) {
        currentPage = 1;
        console.log('-');
      } else {
        currentPage++;
        console.log('--');
      }
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}
