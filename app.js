const body = document.getElementById('body');
const homeContainer = document.getElementById('home-container');
const [homeTitle, aboutTitle, projectsTitle, contactTitle] =
  document.querySelectorAll('.title');
const [homeIntro, homeText, aboutText, projectsText, contactText] =
  document.querySelectorAll('.text');
const [aboutNavText, projectsNavText, contactNavText] =
  document.querySelectorAll('.nav-text');
const focusLinks = document.querySelectorAll('a');
const aboutContainer = document.getElementById('about-container');
const projectsContainer = document.getElementById('projects-container');
const contactContainer = document.getElementById('contact-container');
const aboutLink = document.getElementById('about-link');
const projectsLink = document.getElementById('projects-link');
const contactLink = document.getElementById('contact-link');
const logo = document.getElementById('logo-wrapper');
const logoN = document.getElementById('logo');
const introScreen = document.getElementById('intro-screen');
const navContainerLoad = document.querySelector('.nav-container-load');
const contactIconsLoad = document.querySelector('.contact-icons-load');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const STEPS = 5;
const PARTICLE_COUNT = 20;

const ACCELERATION = 0.4;
const MAX_VELOCITY = ACCELERATION * 100;
const ACC_CLICK = 2;
const COLOR_STEP = 0.5;
const BOUNCINESS = 1;
const ALPHA_ADJUSTMENT = 0.2;

const page1Hue = 45;
const page2Hue = 100;
const page3Hue = 200;
const page4Hue = 260;

const PARTICLE_MIN_RADIUS = 4;
const PARTICLE_MAX_RADIUS = 20;
const initPadding = PARTICLE_MAX_RADIUS * 2;

let particleAcceleration = ACCELERATION;

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
  waiting: true,
  introDelay: 1600,
  screenEnterDelay: 500,
  screenExitDelay: 1000,
  enterDelay: 200,
  textDelay: 400,
  iconDelay: 200,
  navContainerLoadDelay: 1000,
  contactIconsLoadDelay: 200,
  colors: {
    pg1: page1Hue,
    pg2: page2Hue,
    pg3: page3Hue,
    pg4: page4Hue,
  },
  particleColorDifference: 50,
};

const mouse = {
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
    setTimeout(() => (page.waiting = false), page.screenExitDelay);
    changePage();
  }
});
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (page.currentPage != 2 && !page.waiting) {
    page.prevPage = page.currentPage;
    page.currentPage = 2;
    page.waiting = true;
    setTimeout(() => (page.waiting = false), page.screenExitDelay);
    changePage();
  }
});
projectsLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (page.currentPage != 3 && !page.waiting) {
    page.prevPage = page.currentPage;
    page.currentPage = 3;
    page.waiting = true;
    setTimeout(() => (page.waiting = false), page.screenExitDelay);
    changePage();
  }
});
contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (page.currentPage != 4 && !page.waiting) {
    page.prevPage = page.currentPage;
    page.currentPage = 4;
    page.waiting = true;
    setTimeout(() => (page.waiting = false), page.screenExitDelay);
    changePage();
  }
});
//  Cursor Handlers
body.addEventListener('mousedown', bodyMousedownHandler);
body.addEventListener('mouseup', bodyMouseupHandler);
//  Screen Handlers
window.addEventListener('resize', resizeHandler);
window.addEventListener('wheel', wheelHandler);
//  Mouse/Touch Handlers
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
  //  Set canvas size
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  //  Clear Screen
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //  If mousedown, increase particle speed, saturation & max speed
  if (mouse.isMouseDown === true) {
    particleAcceleration = ACCELERATION * ACC_CLICK;
  } else {
    particleAcceleration = ACCELERATION;
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
  //  Move particles
  for (let i = 0; i < particleArr.length; i++) {
    applyForce(mouse, particleArr[i]);
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
  setTimeout(() => {
    introScreen.classList.add('disappear');
  }, page.introDelay);
  setTimeout(() => {
    introScreen.style.display = 'none';
    page.waiting = false;
  }, page.introDelay + 1200);
  setTimeout(() => {
    navContainerLoad.classList.remove('nav-container-load');
  }, page.navContainerLoadDelay);
  setTimeout(() => {
    contactIconsLoad.classList.remove('contact-icons-load');
  }, page.contactIconsLoadDelay);
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
  // console.log(player);
  if (object.velocity.x >= MAX_VELOCITY) {
    object.velocity.x = MAX_VELOCITY;
  } else {
    object.velocity.x += Math.sin(radian) * particleAcceleration;
  }
  if (object.velocity.x <= -MAX_VELOCITY) {
    object.velocity.x = -MAX_VELOCITY;
  } else {
    object.velocity.x += Math.sin(radian) * particleAcceleration;
  }
  if (object.velocity.y >= MAX_VELOCITY) {
    object.velocity.y = MAX_VELOCITY;
  } else {
    object.velocity.y += Math.cos(radian) * particleAcceleration;
  }
  if (object.velocity.y <= -MAX_VELOCITY) {
    object.velocity.y = -MAX_VELOCITY;
  } else {
    object.velocity.y += Math.cos(radian) * particleAcceleration;
  }

  object.x += object.velocity.x - object.velocity.x * 0.9;
  object.y += object.velocity.y - object.velocity.y * 0.9;
}

//  CREATE PARTICLES
function initParticles() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particleArr.push({
      x: getRandomArbitrary(initPadding, window.innerWidth - initPadding),
      y: getRandomArbitrary(initPadding, window.innerHeight - initPadding),
      velocity: {
        x: getRandomArbitrary(-MAX_VELOCITY, MAX_VELOCITY),
        y: getRandomArbitrary(-MAX_VELOCITY, MAX_VELOCITY),
      },
      radius: getRandomArbitrary(PARTICLE_MIN_RADIUS, PARTICLE_MAX_RADIUS),
      fill: {
        h: getRandomArbitrary(40, 60),
        s: getRandomArbitrary(80, 100),
        l: getRandomArbitrary(45, 75),
        a: getRandomArbitrary(0.5, 1),
      },
      isPulledIn: false,
      isPulledInRepeat: false,
    });
  }
}

//  DRAW PARTICLES
function drawParticle(particle) {
  particle.fill.h >= page.particleColorDifference
    ? (particle.fill.h -= COLOR_STEP)
    : (particle.fill.h += COLOR_STEP);
  particle.fill.h > 360 && (particle.fill.h = 0);
  ctx.beginPath();
  // ctx.shadowColor = `hsla(${particle.fill.h}, ${particleSaturation}%, ${
  //   particle.fill.l
  // }%,${particle.fill.a * ALPHA_ADJUSTMENT})`;
  // ctx.shadowBlur = 40;
  // ctx.shadowOffsetX = 0;
  // ctx.shadowOffsetY = 0;
  ctx.fillStyle = `hsla(${particle.fill.h},${particle.fill.s}%,${
    particle.fill.l
  }%,${particle.fill.a * ALPHA_ADJUSTMENT})`;
  ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI, false);
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
  if (item.x + item.radius >= window.innerWidth) {
    item.x = window.innerWidth - item.radius * 1.1;
    item.velocity.x = -item.velocity.x * BOUNCINESS;
  }
  if (item.x <= item.radius) {
    item.x = item.radius;
    item.velocity.x = -item.velocity.x * BOUNCINESS;
  }
  if (item.y + item.radius >= window.innerHeight) {
    item.y = window.innerHeight - item.radius * 1.1;
    item.velocity.y = -item.velocity.y * BOUNCINESS;
  }
  if (item.y <= item.radius) {
    item.y = item.radius;
    item.velocity.y = -item.velocity.y * BOUNCINESS;
  }
}
//  HANDLERS METHODS
function resizeHandler() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  particleArr.forEach((particle) => drawParticle(particle));
}
function bodyMousedownHandler(e) {
  e.preventDefault();
  body.classList.add('grabbing');
}
function bodyMouseupHandler(e) {
  e.preventDefault();
  body.classList.remove('grabbing');
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
        (object) => (object.velocity.y += getRandomArbitrary(-200, 200))
      );
      page.waiting = true;
    } else if (page.currentPage <= 1) {
      page.currentPage = page.totalPages;
      page.waiting = true;
      particleArr.forEach(
        (object) => (object.velocity.x += getRandomArbitrary(-200, 200))
      );
    } else {
      page.currentPage--;
      page.waiting = true;
      particleArr.forEach(
        (object) => (object.velocity.x += getRandomArbitrary(-200, 200))
      );
    }
    changePage();
    setTimeout(() => (page.waiting = false), page.screenExitDelay + 200);
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

//  Deactivate Pages   ------------------------------------------------------------------------------------------
function deactivatePage(currentPage, nextPage, exitStyle, enterStyle) {
  currentPage.style.transition = `${page.screenExitDelay}ms ease-in-out, opacity ${page.screenEnterDelay}ms ease-in-out ${page.screenEnterDelay}ms`;
  nextPage.style.transition = `0s, opacity ${page.screenEnterDelay}ms ease-in-out ${page.screenEnterDelay}ms`;
  nextPage.classList.add(enterStyle);
  nextPage.classList.add(exitStyle);
  nextPage.classList.remove(exitStyle);
  currentPage.classList.add(exitStyle);
  setTimeout(() => {
    nextPage.style.transition = `${page.screenExitDelay}ms ease-in-out, opacity ${page.screenEnterDelay}ms ease-in-out ${page.screenEnterDelay}ms`;
    nextPage.classList.remove(enterStyle);
    nextPage.style.transition = `${page.screenExitDelay}ms ease-in-out, opacity ${page.screenEnterDelay}ms ease-in-out ${page.screenEnterDelay}ms`;
  }, 100);
}

//  Change Pages
function changePage() {
  let exitStyle;
  let enterStyle;
  if (page.prevPage < page.currentPage) {
    if (page.prevPage == 1 && page.currentPage == page.totalPages) {
      enterStyle = 'page-exit-bottom';
      exitStyle = 'page-exit-right';
    } else {
      enterStyle = 'page-exit-right';
      exitStyle = 'page-exit-bottom';
    }
  } else {
    if (page.prevPage == page.totalPages && page.currentPage == 1) {
      enterStyle = 'page-exit-right';
      exitStyle = 'page-exit-bottom';
    } else {
      enterStyle = 'page-exit-bottom';
      exitStyle = 'page-exit-right';
    }
  }

  switch (page.currentPage) {
    case 1:
      //  Screen Transitions
      deactivatePage(
        pagesArr[page.prevPage - 1],
        homeContainer,
        exitStyle,
        enterStyle
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
        homeTitle.classList.remove('text2');
        homeIntro.classList.remove('text');
        homeText.classList.remove('text');
      }, page.textDelay);

      aboutTitle.classList.add('text2');
      projectsTitle.classList.add('text2');
      contactTitle.classList.add('text2');

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
        exitStyle,
        enterStyle
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
        aboutTitle.classList.remove('text2');
        aboutText.classList.remove('text');
      }, page.textDelay);

      homeTitle.classList.add('text2');
      projectsTitle.classList.add('text2');
      contactTitle.classList.add('text2');

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
        exitStyle,
        enterStyle
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
        projectsTitle.classList.remove('text2');
        projectsText.classList.remove('text');
      }, page.textDelay);

      homeTitle.classList.add('text2');
      aboutTitle.classList.add('text2');
      contactTitle.classList.add('text2');

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
        exitStyle,
        enterStyle
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
        contactTitle.classList.remove('text2');
        contactText.classList.remove('text');
      }, page.textDelay);

      homeTitle.classList.add('text2');
      aboutTitle.classList.add('text2');
      projectsTitle.classList.add('text2');

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
