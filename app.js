const body = document.getElementById('body');
const homeContainer = document.getElementById('home-container');
const [homeTitle, aboutTitle, projectsTitle, contactTitle] =
  document.querySelectorAll('.title');
const [homeIntro, homeText, aboutText, projectsText, contactText] =
  document.querySelectorAll('.text');
const [aboutNavText, projectsNavText, contactNavText] =
  document.querySelectorAll('.nav-text');
const [skyline1, skyline2, skyline3] = document.querySelectorAll('#skyline');
const skylineWrapper = document.getElementById('skyline-wrapper');
const skylineLights = document.getElementById('skyline-lights-wrapper');
const skylineLightsColor = document.getElementById('skyline-lights');
const clouds = document.getElementById('clouds');
const [clouds1, clouds2, clouds3, clouds4] =
  document.querySelectorAll('#cloud');
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
const STAR_COUNT = 2000;
const starArr = [];

const CLOUD_COUNT = 15;
const SKYLINE_1 = 25;
const SKYLINE_2 = 10;
const SKYLINE_3 = 3;
let SKYLINE_1_STEP = -16;
let SKYLINE_2_STEP = -6;
let SKYLINE_3_STEP = -1.5;
const LIGHT_SIZE = 5;

const page1Hue = 45;
const page2Hue = 100;
const page3Hue = 200;
const page4Hue = 0;

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
  introDelay: 1400,
  screenEnterDelay: 500,
  screenExitDelay: 1000,
  enterDelay: 200,
  textDelay: 400,
  iconDelay: 200,
  navContainerLoadDelay: 200,
  contactIconsLoadDelay: 200,
  colors: {
    pg1: page1Hue,
    pg2: page2Hue,
    pg3: page3Hue,
    pg4: page4Hue,
  },
};

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  isMouseDown: false,
};
let cloudsArr = [];

//  EVENT LISTENERS  --------------------------------------------------------------------------------------------------------------------------------------------------

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

//  INITIALIZATION  --------------------------------------------------------------------------------------------------------------------------------------------------
initPage();
initCanvas();
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

  initClouds(CLOUD_COUNT);
  skyline1.style.transition = '0s linear';
  skyline2.style.transition = '0s linear';
  skyline3.style.transition = '0s linear';
  skylineLights.style.transition = '0s linear';

  moveSkyline();
  skylineLightsColor.style.fill = 'var(--page1-color)';
  skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page1-color))`;
}

function initCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  createStars(STAR_COUNT);
  drawStars();
}
console.log(starArr);

function createStars(num) {
  for (let i = 0; i < num; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const star = {
      x: x,
      y: y,
      xNormalized: x / window.innerWidth,
      yNormalized: y / window.innerHeight,
      radius: getRandomArbitrary(0.1, 1.3),
      h:
        Math.random() > 0.5
          ? getRandomArbitrary(190, 230)
          : getRandomArbitrary(350, 370),
      s: getRandomArbitrary(40, 80),
      l: getRandomArbitrary(70, 100),
      a: getRandomArbitrary(0.3, 0.8),
    };
    starArr.push(star);
  }
}

function drawStars() {
  starArr.forEach((star) => {
    ctx.fillStyle = `hsla(${star.h},${star.s}%,${star.l}%,${star.a})`;
    ctx.fillRect(
      star.xNormalized * window.innerWidth,
      star.yNormalized * window.innerHeight,
      star.radius,
      star.radius
    );
  });
}

function initClouds(count) {
  for (let i = 0; i < count; i++) {
    const cloud = {
      x: getRandomArbitrary(2, 100),
      y: getRandomArbitrary(25, 55),
      size: getRandomArbitrary(3, 10),
      opacity: getRandomArbitrary(0.95, 1),
      animationDuration: getRandomArbitrary(40000, 400000),
      animationDelay: getRandomArbitrary(0, 2),
      zIndex: Math.floor(getRandomArbitrary(6, 10)),
      isFlipped: Math.random() > 0.5 ? false : true,
    };
    cloudsArr.push(cloud);
    const cloudStyles = {
      position: 'fixed',
      left: `${cloud.x + 100}%`,
      bottom: `${cloud.y}%`,
      width: ` calc(30px + ${cloud.size}%)`,
      opacity: `${cloud.opacity}`,
      zIndex: `${cloud.zIndex}`,
      animationDuration: `${cloud.animationDuration}ms`,
      animationDelay: `${cloud.animationDelay}s`,
      transform: `rotateY(${cloud.isFlipped ? '180deg' : '0deg'})`,
    };
    const cloudDrifting = [
      { left: `${cloud.x + 100}%` },
      { left: `${getRandomArbitrary(-25, -15)}%` },
    ];
    const cloudDriftingOptions = {
      duration: cloud.animationDuration,
      iterations: Infinity,
    };
    const cloudImg = document.createElement('img');
    cloudImg.src = `images/cloud${Math.round(getRandomArbitrary(1, 4))}.svg`;
    Object.assign(cloudImg.style, cloudStyles);
    cloudImg.animate(cloudDrifting, cloudDriftingOptions);

    skylineWrapper.appendChild(cloudImg);
    cloudImg.onanimationiteration = () => {
      cloudImg.remove();
      initClouds(1);
    };
  }
}

// SMALLER FUNCTIONS  --------------------------------------------------------------------------------------------------------------------------------------------------
//  GET RANDOM NUMBER BETWEEN 2 VALUES
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//  HANDLERS METHODS
function resizeHandler() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  drawStars();
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
function moveSkyline() {
  skyline1.style.boxShadow = `0px 0px calc(20px + 2.5vw) calc(18px + 0.6vw) hsla(var(--page${page.currentPage}-hue), 100%, 50%, 0.3)`;
  skyline1.style.transform = `translateX(${
    SKYLINE_1 + SKYLINE_1_STEP * (page.currentPage - 1)
  }%)`;
  skyline2.style.boxShadow = `0px 0px calc(25px + 3vw) calc(50px + 1.1vw) hsla(var(--page${page.currentPage}-hue), 100%, 50%, 0.5)`;
  skyline2.style.transform = `translateX(${
    SKYLINE_2 + SKYLINE_2_STEP * (page.currentPage - 1)
  }%)`;
  skyline3.style.transform = `translateX(${
    SKYLINE_3 + SKYLINE_3_STEP * (page.currentPage - 1)
  }%)`;
  skylineLights.style.transform = `translateX(${
    SKYLINE_3 + SKYLINE_3_STEP * (page.currentPage - 1)
  }%)`;
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

      page.waiting = true;
    } else if (page.currentPage <= 1) {
      page.currentPage = page.totalPages;
      page.waiting = true;
    } else {
      page.currentPage--;
      page.waiting = true;
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

//  Deactivate Pages
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

//  Change Pages  --------------------------------------------------------------------------------------------------------------------------------------------------
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

      skyline1.style.transition = '1s ease-in-out 0.1s';
      skyline2.style.transition = '1s ease-in-out 0.1s';
      skyline3.style.transition = '1s ease-in-out 0.1s';
      skylineLights.style.transition = '1s ease-in-out 0.1s';

      moveSkyline();
      skylineLightsColor.style.fill = 'var(--page1-color)';
      skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page1-color))`;
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

      skyline1.style.transition = '1s ease-in-out 0.1s';
      skyline2.style.transition = '1s ease-in-out 0.1s';
      skyline3.style.transition = '1s ease-in-out 0.1s';
      skylineLights.style.transition = '1s ease-in-out 0.1s';

      moveSkyline();
      skylineLightsColor.style.fill = 'var(--page2-color)';
      skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page2-color))`;
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

      skyline1.style.transition = '1s ease-in-out 0.1s';
      skyline2.style.transition = '1s ease-in-out 0.1s';
      skyline3.style.transition = '1s ease-in-out 0.1s';
      skylineLights.style.transition = '1s ease-in-out 0.1s';

      moveSkyline();
      skylineLightsColor.style.fill = 'var(--page3-color)';
      skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page3-color))`;
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

      skyline1.style.transition = '1s ease-in-out 0.1s';
      skyline2.style.transition = '1s ease-in-out 0.1s';
      skyline3.style.transition = '1s ease-in-out 0.1s';
      skylineLights.style.transition = '1s ease-in-out 0.1s';
      moveSkyline();
      skylineLightsColor.style.fill = 'var(--page4-color)';
      skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page4-color))`;
      break;

    default:
      break;
  }
}
