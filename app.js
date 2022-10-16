const body = document.getElementById('body');
const homeContainer = document.getElementById('home-container');
const [homeIntro, homeText, aboutText, projectsText, contactText] =
  document.querySelectorAll('.text');
const [aboutNavText, projectsNavText, contactNavText] =
  document.querySelectorAll('.nav-text');
const aboutContainer = document.getElementById('about-container');
const projectsContainer = document.getElementById('projects-container');
const contactContainer = document.getElementById('contact-container');
const aboutLink = document.getElementById('about-link');
const projectsLink = document.getElementById('projects-link');
const contactLink = document.getElementById('contact-link');
const logo = document.getElementById('logo-wrapper');
const logoN = document.getElementById('logo');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1920;
const canvasHeight = 1080;

const STEPS = 2;
const PARTICLE_COUNT = 50;
const SPEED = 0.04;
const MAX_SPEED = SPEED * 70;
const CLICK_SPEED = 3;
const COLOR = 0.5;
const SATURATION_STEP = 0.2;
const SATURATION = 70;
const MAX_SATURATION = 100;
const BOUNCINESS = 100;

const minStarSize = 4;
const maxStarSize = 20;
const maxJiggle = 0.1;
const gravConstant = 2;
const initMouseMass = maxStarSize * 200;
const initPadding = maxStarSize * 5;
const zonePadding = 50;

let particleSpeed = SPEED;
let particleColor = COLOR;
let particleSaturation = SATURATION;
let maxDir = MAX_SPEED;
let alphaAdjuster = 0.7;
let nameColorTimer = 0;

const particleArr = [];
const pagesArr = [
  homeContainer,
  aboutContainer,
  projectsContainer,
  contactContainer,
];

const page = {
  currentPage: 1,
  prevPage: 1,
  totalPages: 4,
  waiting: false,
  screenDelay: 1600,
  textDelay: 800,
  colors: {
    pg1: 45,
    pg2: 120,
    pg3: 200,
    pg4: 300,
  },
  particleColorDifference: 50,
};

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  isMouseDown: false,
};

//  EVENT LISTENERS
//  Link Click Handlers
logo.addEventListener('click', (e) => {
  e.preventDefault();
  if (page.currentPage != 1 && !page.waiting) {
    page.prevPage = page.currentPage;
    page.currentPage = 1;
    page.waiting = true;
    setTimeout(() => (page.waiting = false), page.screenDelay);
    changePage();
  }
});
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (page.currentPage != 2 && !page.waiting) {
    page.prevPage = page.currentPage;
    page.currentPage = 2;
    page.waiting = true;
    setTimeout(() => (page.waiting = false), page.screenDelay);
    changePage();
  }
});
projectsLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (page.currentPage != 3 && !page.waiting) {
    page.prevPage = page.currentPage;
    page.currentPage = 3;
    page.waiting = true;
    setTimeout(() => (page.waiting = false), page.screenDelay);
    changePage();
  }
});
contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (page.currentPage != 4 && !page.waiting) {
    page.prevPage = page.currentPage;
    page.currentPage = 4;
    page.waiting = true;
    setTimeout(() => (page.waiting = false), page.screenDelay);
    changePage();
  }
});

//  Body Drag Handler
body.addEventListener('mousedown', bodyMousedownHandler);
body.addEventListener('mouseup', bodyMouseupHandler);

window.addEventListener('resize', resizeHandler);
window.addEventListener('wheel', wheelHandler);
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

initPage();

//  APP ENGINE
const Engine = setInterval(() => app(), STEPS);

//  MAIN APP
function app() {
  //  Clear Screen every frame
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //  If mousedown, increase particle speed, saturation & max speed
  if (mouse.isMouseDown === true) {
    particleSpeed = SPEED * CLICK_SPEED;
    particleSaturation > MAX_SATURATION
      ? (particleSaturation = MAX_SATURATION)
      : (particleSaturation += SATURATION_STEP);
    maxDir = MAX_SPEED * 1.3;
  } else {
    particleSpeed = SPEED;
    particleSaturation < SATURATION
      ? (particleSaturation = SATURATION)
      : (particleSaturation -= SATURATION_STEP);
    maxDir = MAX_SPEED;
  }
  //  Track mouse/touch position
  window.onmousemove = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  };
  window.ontouchmove = (e) => {
    mouse.x = e.changedTouches[0].clientX;
    mouse.y = e.changedTouches[0].clientY;
  };
  //  Move and draw particles
  for (let i = 0; i < particleArr.length; i++) {
    applyForce(mouse, particleArr[i]);

    //  Move Particle
    moveParticle(particleArr[i]);

    //  Set screen behaviour - Wrap or Bounce
    screenBounce(particleArr[i]);
    // screenWrap(particleArr[i]);

    //  Draw to canvas
    drawParticle(particleArr[i]);
  }
}

//  INITIALIZATION
function initPage() {
  homeIntro.classList.remove('text');
  homeText.classList.remove('text');
  initCanvas();
}
function initCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  initParticles();
}
//  CALCULATING "GRAVITATIONAL" FORCE
function applyForce(player, object) {
  let radian = Math.atan2(player.x - object.x, player.y - object.y);
  //  Apply Force
  object.dirX += Math.sin(radian) * particleSpeed;
  object.dirY += Math.cos(radian) * particleSpeed;
}
//  CREATE PARTICLES
function initParticles() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particleArr.push({
      x: getRandomArbitrary(initPadding, window.innerWidth - initPadding),
      y: getRandomArbitrary(initPadding, window.innerHeight - initPadding),
      dirX: getRandomArbitrary(-MAX_SPEED, MAX_SPEED),
      dirY: getRandomArbitrary(-MAX_SPEED, MAX_SPEED),
      size: getRandomArbitrary(minStarSize, maxStarSize),
      h: getRandomArbitrary(40, 60),
      s: getRandomArbitrary(80, 100),
      l: getRandomArbitrary(45, 75),
      alpha: getRandomArbitrary(0.1, 1),
      isPulledIn: false,
      isPulledInRepeat: false,
    });
  }
}
//  CALCULATE PARTICLE SPEED
function moveParticle(particle) {
  //  Set Max Particle Speed Limit
  if (particle.dirX < -maxDir) particle.dirX = -maxDir;
  if (particle.dirX > maxDir) particle.dirX = maxDir;
  if (particle.dirY < -maxDir) particle.dirY = -maxDir;
  if (particle.dirY > maxDir) particle.dirY = maxDir;
  //  Set Particle Speed
  particle.x += particle.dirX;
  particle.y += particle.dirY;
}

//  DRAW PARTICLES
function drawParticle(particle) {
  particle.h >= page.particleColorDifference
    ? (particle.h -= particleColor)
    : (particle.h += particleColor);
  particle.h > 360 && (particle.h = 0);
  ctx.beginPath();
  ctx.fillStyle = `hsla(${particle.h},${particleSaturation}%,${particle.l}%,${
    particle.alpha * alphaAdjuster
  })`;
  ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
}
//  GET RANDOM NUMBER BETWEEN 2 VALUES
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//  FIND DISTANCE BETWEEN 2 POINTS//
function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
//  SCREEN WRAP BEHAVIOUR
function screenWrap(item) {
  if (item.x > window.innerWidth) item.x = item.x - window.innerWidth;
  if (item.x < 0) item.x = item.x + window.innerWidth;
  if (item.y < 0) item.y = item.y + window.innerHeight;
  if (item.y > window.innerHeight) item.y = item.y - window.innerHeight;
}
function screenBounce(item) {
  if (item.x + item.size >= window.innerWidth) {
    item.x = window.innerWidth - item.size * getRandomArbitrary(1.2, 2.5);
    item.dirX = -item.dirX;
  }
  if (item.x <= 0) {
    item.x = item.size * getRandomArbitrary(1.2, 2.5);
    item.dirX = -item.dirX;
  }
  if (item.y + item.size >= window.innerHeight) {
    item.y = window.innerHeight - item.size * getRandomArbitrary(1.2, 2.5);
    item.dirY = -item.dirY;
  }
  if (item.y <= 0) {
    item.y = item.size * getRandomArbitrary(1.2, 2.5);
    item.dirY = -item.dirY;
  }
}
//  HANDLERS METHODS
function bodyMousedownHandler(e) {
  e.preventDefault();
  body.classList.add('grabbing');
}
function bodyMouseupHandler(e) {
  e.preventDefault();
  body.classList.remove('grabbing');
}
function resizeHandler() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  particleArr.forEach((particle) => drawParticle(particle));
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
function wheelHandler(e) {
  if (!page.waiting) {
    page.prevPage = page.currentPage;

    if (e.wheelDeltaY < 0) {
      if (page.currentPage >= page.totalPages) {
        page.currentPage = 1;
      } else {
        page.currentPage++;
      }
      particleArr.forEach(
        (object) => (object.dirY += getRandomArbitrary(-200, 200))
      );
      page.waiting = true;
    } else if (page.currentPage <= 1) {
      page.currentPage = page.totalPages;
      page.waiting = true;
      particleArr.forEach(
        (object) => (object.dirX += getRandomArbitrary(-200, 200))
      );
    } else {
      page.currentPage--;
      page.waiting = true;
      particleArr.forEach(
        (object) => (object.dirX += getRandomArbitrary(-200, 200))
      );
    }
    changePage();
    setTimeout(() => (page.waiting = false), page.screenDelay);
  }
}
//  Change Classes
function changeClass(
  elementsRemoveArr,
  removeClassArr,
  elementsAddArr,
  addClass
) {
  elementsRemoveArr.forEach((element) => {
    for (let i = 0; i < removeClassArr.length; i++) {
      removeClassArr[i];
      element.classList.remove(removeClassArr[i]);
    }
  });
  if (elementsAddArr) {
    elementsAddArr.forEach((element) => element.classList.add(addClass));
  }
}

//  Deactivate Pages
function deactivatePage(prevPage, currentPage, exitStyle, deactivateStyle) {
  prevPage.classList.add(exitStyle);
  setTimeout(() => {
    prevPage.classList.add(deactivateStyle);
    prevPage.classList.remove(exitStyle);
  }, page.screenDelay);
  currentPage.classList.remove(deactivateStyle);
}

//  Change Pages
function changePage() {
  switch (page.currentPage) {
    case 1:
      //  Screen Transitions
      deactivatePage(
        pagesArr[page.prevPage - 1],
        homeContainer,
        'page-exit',
        'deactive'
      );
      //  Link Transitions
      //  change active link
      logo.classList.remove('active-logo-link');
      changeClass(
        [aboutLink, projectsLink, contactLink],
        ['active-link'],
        [logo],
        'active-logo-link'
      );
      //  change active link underline color
      changeClass(
        [aboutLink, projectsLink, contactLink],
        ['page1-bg', 'page2-bg', 'page3-bg', 'page4-bg'],
        [logo],
        'page1-bg'
      );
      //  change marker color
      changeClass(
        [logoN, aboutNavText, projectsNavText, contactNavText],
        ['page2-color', 'page3-color', 'page4-color'],
        [logoN, aboutNavText, projectsNavText, contactNavText],
        'page1-color'
      );
      //  Text Transitions

      setTimeout(() => {
        homeIntro.classList.remove('text');
        homeText.classList.remove('text');
      }, page.textDelay);

      aboutText.classList.add('text');
      projectsText.classList.add('text');
      contactText.classList.add('text');
      //  Particle Effects
      page.particleColorDifference = page.colors.pg1;
      break;
    case 2:
      //  Screen Transitions
      deactivatePage(
        pagesArr[page.prevPage - 1],
        aboutContainer,
        'page-exit',
        'deactive'
      );

      //  Link Transitions
      //  change active link
      logo.classList.remove('active-logo-link');
      changeClass(
        [logo, projectsLink, contactLink],
        ['active-link'],
        [aboutLink],
        'active-link'
      );
      //  change active link underline color
      changeClass(
        [logo, aboutLink, projectsLink, contactLink],
        ['page1-bg', 'page3-bg', 'page4-bg'],
        [aboutLink],
        'page2-bg'
      );
      //  change marker color
      changeClass(
        [logoN, aboutNavText, projectsNavText, contactNavText],
        ['page1-color', 'page3-color', 'page4-color'],
        [logoN, aboutNavText, projectsNavText, contactNavText],
        'page2-color'
      );
      //  Text Transitions
      setTimeout(() => {
        aboutText.classList.remove('text');
      }, page.textDelay);

      homeIntro.classList.add('text');
      homeText.classList.add('text');
      projectsText.classList.add('text');
      contactText.classList.add('text');
      //  Particle Effects
      page.particleColorDifference = page.colors.pg2;
      break;
    case 3:
      //  Screen Transitions
      deactivatePage(
        pagesArr[page.prevPage - 1],
        projectsContainer,
        'page-exit',
        'deactive'
      );

      //  Link Transitions
      //  change active link
      logo.classList.remove('active-logo-link');
      changeClass(
        [logo, aboutLink, contactLink],
        ['active-link'],
        [projectsLink],
        'active-link'
      );
      //  change active link underline color
      changeClass(
        [logo, aboutLink, projectsLink, contactLink],
        ['page1-bg', 'page2-bg', 'page4-bg'],
        [projectsLink],
        'page3-bg'
      );
      //  change marker color
      changeClass(
        [logoN, aboutNavText, projectsNavText, contactNavText],
        ['page1-color', 'page2-color', 'page4-color'],
        [logoN, aboutNavText, projectsNavText, contactNavText],
        'page3-color'
      );
      //  Text Transitions
      setTimeout(() => {
        projectsText.classList.remove('text');
      }, page.textDelay);

      homeIntro.classList.add('text');
      homeText.classList.add('text');
      aboutText.classList.add('text');
      contactText.classList.add('text');

      //  Particle Effects
      page.particleColorDifference = page.colors.pg3;
      break;
    case 4:
      //  Screen Transitions
      deactivatePage(
        pagesArr[page.prevPage - 1],
        contactContainer,
        'page-exit',
        'deactive'
      );

      //  Link Transitions
      //  change active link
      logo.classList.remove('active-logo-link');
      changeClass(
        [logo, aboutLink, projectsLink],
        ['active-link'],
        [contactLink],
        'active-link'
      );
      //  change active link underline color
      changeClass(
        [logo, aboutLink, projectsLink, contactLink],
        ['page1-bg', 'page2-bg', 'page3-bg'],
        [contactLink],
        'page4-bg'
      );
      //  change marker color
      changeClass(
        [logoN, aboutNavText, projectsNavText, contactNavText],
        ['page1-color', 'page2-color', 'page3-color'],
        [logoN, aboutNavText, projectsNavText, contactNavText],
        'page4-color'
      );
      //  Text Transitions
      setTimeout(() => {
        contactText.classList.remove('text');
      }, page.textDelay);

      homeIntro.classList.add('text');
      homeText.classList.add('text');
      aboutText.classList.add('text');
      projectsText.classList.add('text');

      //  Particle Effects
      page.particleColorDifference = page.colors.pg4;
      break;

    default:
      break;
  }
}
