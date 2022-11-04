const body = document.getElementById('body');
const introScreen = document.getElementById('intro-screen');
const navContainerLoad = document.querySelector('.nav-container-load');
const contactIconsLoad = document.querySelector('.contact-icons-load');
const logo = document.getElementById('logo-wrapper');
const logoLastName = document.getElementById('logo-last-name');
const [aboutNavText, projectsNavText, contactNavText] = document.querySelectorAll('.nav-text');
const [homeNavMobile, aboutNavMobile, projectsNavMobile, contactNavMobile] =
    document.querySelectorAll('.mobile-nav-btn');
const focusLinks = document.querySelectorAll('a');
const aboutLink = document.getElementById('about-link');
const projectsLink = document.getElementById('projects-link');
const contactLink = document.getElementById('contact-link');
const homeContainer = document.getElementById('home-container');
const aboutContainer = document.getElementById('about-container');
const projectsContainer = document.getElementById('projects-container');
const contactContainer = document.getElementById('contact-container');
const [homeTitle, aboutTitle, projectsTitle, contactTitle] = document.querySelectorAll('.title');
const [homeIntro, homeText, aboutText, projectsText, contactText] =
    document.querySelectorAll('.text');

const projectsListWrapper = document.getElementById('projects-list-wrapper');
const projectsList = document.getElementById('projects-list');
const projectsListItem = document.querySelectorAll('#projects-list-item');
const [skyline1, skyline2, skyline3] = document.querySelectorAll('#skyline');
const skylineWrapper = document.getElementById('skyline-wrapper');
const skylineLights = document.getElementById('skyline-lights-wrapper');
const skylineLightsColor = document.getElementById('skyline-lights');
const clouds = document.getElementById('clouds');
const [clouds1, clouds2, clouds3, clouds4] = document.querySelectorAll('#cloud');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const STAR_COUNT = 2500;
const starArr = [];

const CLOUD_COUNT = 15;
const SKYLINE_1 = 24;
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

const PROJECTS_ITEM_SCROLL_DESKTOP = 20;

const pagesArr = [homeContainer, aboutContainer, projectsContainer, contactContainer];

const page = {
    currentPage: 1,
    prevPage: 1,
    totalPages: 4,
    waiting: true,
    projectsWaiting: false,
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
    prevX: window.innerWidth / 2,
    prevY: window.innerHeight / 2,
    isMouseDown: false,
    mouseStart: {
        x: 0,
        y: 0,
    },
    mouseEnd: {
        x: 0,
        y: 0,
    },
    minDrag: 5,
    dragX: 0,
    dragXMultiplier: 0.4,
};
let cloudsArr = [];

const projectsListArr = [
    {
        image: "url('/images/projects/u2d/u2d-hero.jpg')",
        title: 'Up2DateSolutions.com',
        skills: [
            {
                skill: 'HTML',
                class: 'frontend',
            },
            {
                skill: 'CSS',
                class: 'frontend',
            },
            {
                skill: 'JavaScript',
                class: 'frontend',
            },
            {
                skill: 'Adobe CC',
                class: 'design',
            },
        ],
        description:
            'Fully responsive and mobile friendly, single page website built using HTML5, CSS3 and JavaScript. The logo and graphics were created and processed using Adobe Illustrator and Photoshop.',
        url: 'https://www.up2datesolutions.com/',
        links: [
            {
                name: 'github',
                href: 'https://github.com/lunovello/up2dateSolutions',
                class: 'github-icon',
                icon: `<svg
                    class="projects-list-item-icon github-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                </svg>`,
            },
            {
                name: 'external',
                href: 'https://www.up2datesolutions.com/',
                class: 'external-icon',
                icon: `<svg
                    class="projects-list-item-icon external-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                    ></path>
                </svg>`,
            },
        ],
    },
    {
        image: "url('/images/projects/u2d/rizza-hero.jpg')",
        title: 'RizzaInsurance.com',
        skills: [
            {
                skill: 'HTML',
                class: 'frontend',
            },
            {
                skill: 'CSS',
                class: 'frontend',
            },
            {
                skill: 'JavaScript',
                class: 'frontend',
            },
            {
                skill: 'Adobe CC',
                class: 'design',
            },
        ],
        description:
            'Fully responsive and mobile friendly, single page website built using HTML5, CSS3 and JavaScript. The logo and graphics were created and processed using Adobe Illustrator and Photoshop.',
        url: 'https://www.rizzainsurance.com/',
        links: [
            {
                name: 'external',
                href: 'https://www.rizzainsurance.com/',
                class: 'external-icon',
                icon: `<svg
                class="projects-list-item-icon external-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                ></path>
            </svg>`,
            },
        ],
    },
    {
        image: "url('/images/projects/u2d/fps-hero.jpg')",
        title: 'FoxtailPropertyServices.com',
        skills: [
            {
                skill: 'HTML',
                class: 'frontend',
            },
            {
                skill: 'CSS',
                class: 'frontend',
            },
            {
                skill: 'Wordpress',
                class: 'frontend',
            },
            {
                skill: 'Adobe CC',
                class: 'design',
            },
        ],
        description:
            'Fully responsive and mobile friendly, single page website built using HTML5, CSS3 and JavaScript. The logo and graphics were created and processed using Adobe Illustrator and Photoshop.',
        url: 'https://www.foxtailpropertyservices.com/',
        links: [
            {
                name: 'external',
                href: 'http://www.foxtailpropertyservices.com/',
                class: 'external-icon',
                icon: `<svg
                class="projects-list-item-icon external-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                ></path>
            </svg>`,
            },
        ],
    },
    {
        image: "url('/images/projects/u2d/u2d-website-snippet.jpg')",
        title: 'Up2DateSolutions.com',
        skills: [
            {
                skill: 'HTML',
                class: 'frontend',
            },
            {
                skill: 'CSS',
                class: 'frontend',
            },
            {
                skill: 'JavaScript',
                class: 'frontend',
            },
            {
                skill: 'Adobe CC',
                class: 'design',
            },
        ],
        description:
            'Fully responsive and mobile friendly, single page website built using HTML5, CSS3 and JavaScript. The logo and graphics were created and processed using Adobe Illustrator and Photoshop.',
        links: [
            {
                name: 'github',
                href: 'https://github.com/lunovello/up2dateSolutions',
                class: 'github-icon',
                icon: `<svg
                class="projects-list-item-icon github-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
            </svg>`,
            },
            {
                name: 'external',
                href: 'https://www.up2datesolutions.com/',
                class: 'external-icon',
                icon: `<svg
                class="projects-list-item-icon external-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                ></path>
            </svg>`,
            },
        ],
    },
    {
        image: "url('/images/projects/u2d/u2d-website-snippet.jpg')",
        title: 'Up2DateSolutions.com',
        skills: [
            {
                skill: 'HTML',
                class: 'frontend',
            },
            {
                skill: 'CSS',
                class: 'frontend',
            },
            {
                skill: 'JavaScript',
                class: 'frontend',
            },
            {
                skill: 'Adobe CC',
                class: 'design',
            },
        ],
        description:
            'Fully responsive and mobile friendly, single page website built using HTML5, CSS3 and JavaScript. The logo and graphics were created and processed using Adobe Illustrator and Photoshop.',
        links: [
            {
                name: 'github',
                href: 'https://github.com/lunovello/up2dateSolutions',
                class: 'github-icon',
                icon: `<svg
                class="projects-list-item-icon github-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
            </svg>`,
            },
            {
                name: 'external',
                href: 'https://www.up2datesolutions.com/',
                class: 'external-icon',
                icon: `<svg
                class="projects-list-item-icon external-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                ></path>
            </svg>`,
            },
        ],
    },
    {
        image: "url('/images/projects/u2d/u2d-website-snippet.jpg')",
        title: 'Up2DateSolutions.com',
        skills: [
            {
                skill: 'HTML',
                class: 'frontend',
            },
            {
                skill: 'CSS',
                class: 'frontend',
            },
            {
                skill: 'JavaScript',
                class: 'frontend',
            },
            {
                skill: 'Adobe CC',
                class: 'design',
            },
        ],
        description:
            'Fully responsive and mobile friendly, single page website built using HTML5, CSS3 and JavaScript. The logo and graphics were created and processed using Adobe Illustrator and Photoshop.',
        links: [
            {
                name: 'github',
                href: 'https://github.com/lunovello/up2dateSolutions',
                class: 'github-icon',
                icon: `<svg
                class="projects-list-item-icon github-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
            </svg>`,
            },
            {
                name: 'external',
                href: 'https://www.up2datesolutions.com/',
                class: 'external-icon',
                icon: `<svg
                class="projects-list-item-icon external-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                ></path>
            </svg>`,
            },
        ],
    },
    {
        image: "url('/images/projects/u2d/u2d-website-snippet.jpg')",
        title: 'Up2DateSolutions.com',
        skills: [
            {
                skill: 'HTML',
                class: 'frontend',
            },
            {
                skill: 'CSS',
                class: 'frontend',
            },
            {
                skill: 'JavaScript',
                class: 'frontend',
            },
            {
                skill: 'Adobe CC',
                class: 'design',
            },
        ],
        description:
            'Fully responsive and mobile friendly, single page website built using HTML5, CSS3 and JavaScript. The logo and graphics were created and processed using Adobe Illustrator and Photoshop.',
        links: [
            {
                name: 'github',
                href: 'https://github.com/lunovello/up2dateSolutions',
                class: 'github-icon',
                icon: `<svg
                class="projects-list-item-icon github-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
            </svg>`,
            },
            {
                name: 'external',
                href: 'https://www.up2datesolutions.com/',
                class: 'external-icon',
                icon: `<svg
                class="projects-list-item-icon external-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
            >
                <path
                    d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                ></path>
            </svg>`,
            },
        ],
    },
];
let projectsListChildren = [];

//  INITIALIZATION  --------------------------------------------------------------------------------------------------------------------------------------------------
initCanvas();
initPage();
initProjects();

const projectsObject = {
    positionX: 0,
    scrollSpeed: projectsList.offsetWidth / projectsList.children.length / 2,
};
//  EVENT LISTENERS  --------------------------------------------------------------------------------------------------------------------------------------------------

//  Link Click Handlers
logo.addEventListener('click', (e) => navClickHandler(e, 1));
aboutLink.addEventListener('click', (e) => navClickHandler(e, 2));
projectsLink.addEventListener('click', (e) => navClickHandler(e, 3));
contactLink.addEventListener('click', (e) => navClickHandler(e, 4));

homeNavMobile.addEventListener('click', (e) => {
    navClickHandler(e, 1);
    mobileNavColorHandler(homeNavMobile, 1, [aboutNavMobile, projectsNavMobile, contactNavMobile]);
});
aboutNavMobile.addEventListener('click', (e) => {
    navClickHandler(e, 2);
    mobileNavColorHandler(aboutNavMobile, 2, [homeNavMobile, projectsNavMobile, contactNavMobile]);
});
projectsNavMobile.addEventListener('click', (e) => {
    navClickHandler(e, 3);
    mobileNavColorHandler(projectsNavMobile, 3, [aboutNavMobile, homeNavMobile, contactNavMobile]);
});
contactNavMobile.addEventListener('click', (e) => {
    navClickHandler(e, 4);
    mobileNavColorHandler(contactNavMobile, 4, [aboutNavMobile, projectsNavMobile, homeNavMobile]);
});

function navClickHandler(e, pageNum) {
    e.preventDefault();
    if (page.currentPage != pageNum && !page.waiting) {
        page.prevPage = page.currentPage;
        page.currentPage = pageNum;
        page.waiting = true;
        setTimeout(() => (page.waiting = false), page.screenExitDelay);
        changePage();
    }
}

function mobileNavColorHandler(activeElement, pageNum, disabledElements) {
    activeElement.style.color = `var(--page${pageNum}-color)`;
    disabledElements.forEach((element) => (element.style.color = 'white'));
}

//  Screen Handlers
window.addEventListener('resize', resizeHandler);
window.addEventListener('wheel', (e) => {
    if (!page.waiting && !page.projectsWaiting) {
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
});
//  Mouse/Touch Handlers

// window.addEventListener('touchstart', (e) => {
//     if (!page.waiting) {
//         mouse.isMouseDown = true;
//         mouse.x = e.changedTouches[0].screenX;
//         mouse.y = e.changedTouches[0].screenY;
//         mouse.prevX = mouse.x;
//         mouse.mouseStart.x = e.changedTouches[0].screenX;
//         mouse.mouseStart.y = e.changedTouches[0].screenY;
//         mouse.dragX = ((mouse.x - mouse.mouseStart.x) / window.innerWidth) * mouse.dragXMultiplier;
//         changeTransition('0s linear');
//         window.ontouchmove = (event) => {
//             mouse.prevX = mouse.x;
//             mouse.x = event.changedTouches[0].screenX;
//             mouse.y = event.changedTouches[0].screenY;
//             mouse.dragX =
//                 ((mouse.x - mouse.mouseStart.x) / window.innerWidth) * mouse.dragXMultiplier;
//             moveSkyline();
//         };
//     }
// });
window.addEventListener('touchend', (e) => {
    window.ontouchmove = null;
    mouse.isMouseDown = false;
    mouse.prevX = mouse.x;
    mouse.x = e.changedTouches[0].screenX;
    mouse.y = e.changedTouches[0].screenY;
    mouse.mouseEnd.x = e.changedTouches[0].screenX;
    mouse.mouseEnd.y = e.changedTouches[0].screenY;
    mouse.dragX = 0;
});

projectsListWrapper.addEventListener('scroll', (e) => {
    e.preventDefault();
    projectsList.style.transition = '0.3s ease';
    console.log(e);
});

projectsListWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    projectsList.style.transition = '0.3s ease';

    if (e.wheelDeltaY < 0) {
        page.projectsWaiting = true;
        projectsObject.positionX -= projectsObject.scrollSpeed;
    }
    if (e.wheelDeltaY > 0) {
        page.projectsWaiting = true;
        projectsObject.positionX += projectsObject.scrollSpeed;
    }

    if (projectsObject.positionX >= 0) projectsObject.positionX = 0;

    if (projectsObject.positionX <= -projectsList.offsetWidth + window.innerWidth / 2) {
        projectsObject.positionX = -projectsList.offsetWidth + window.innerWidth / 2;
        setTimeout(() => (page.projectsWaiting = false), 200);
        // page.projectsWaiting = false;
    }

    projectsList.style.transform = `translateX(${projectsObject.positionX}px)`;
});
projectsListWrapper.addEventListener('mousedown', (e) => {
    e.preventDefault();
    mouse.isMouseDown = true;
    mouse.prevX = e.x;
    mouse.x = e.x;
    projectsList.style.transition = '0.03s linear';
    window.onmousemove = (e) => {
        mouse.prevX = mouse.x;
        mouse.x = e.x;
        mouse.dragX = mouse.x - mouse.prevX;
        projectsObject.positionX += mouse.dragX;
        if (projectsObject.positionX >= 0) projectsObject.positionX = 0;
        if (projectsObject.positionX <= -projectsList.offsetWidth + window.innerWidth / 2)
            projectsObject.positionX = -projectsList.offsetWidth + window.innerWidth / 2;
        projectsList.style.transform = `translateX(${projectsObject.positionX}px)`;
    };
    body.style.cursor = 'grabbing';
    projectsListWrapper.style.cursor = 'grabbing';
});
projectsListWrapper.addEventListener('touchstart', (e) => {
    mouse.isMouseDown = true;
    mouse.x = e.changedTouches[0].screenX;
    mouse.prevX = mouse.x;
    mouse.mouseStart.x = e.changedTouches[0].screenX;
    mouse.dragX = ((mouse.x - mouse.mouseStart.x) / window.innerWidth) * mouse.dragXMultiplier;
    projectsList.style.transition = '0.03s linear';
    window.ontouchmove = (event) => {
        mouse.prevX = mouse.x;
        mouse.x = event.changedTouches[0].screenX;
        mouse.dragX = mouse.x - mouse.prevX;
        projectsObject.positionX += mouse.dragX;
        if (projectsObject.positionX >= 0) projectsObject.positionX = 0;
        if (projectsObject.positionX <= -projectsList.offsetWidth + window.innerWidth / 2)
            projectsObject.positionX = -projectsList.offsetWidth + window.innerWidth / 2;
        projectsList.style.transform = `translateX(${projectsObject.positionX}px)`;
    };
    body.style.cursor = 'grabbing';
    projectsListWrapper.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', (e) => {
    window.onmousemove = null;
    mouse.dragX = 0;
    mouse.prevX = mouse.x;
    mouse.x = e.x;
    body.style.cursor = 'default';
    projectsListWrapper.style.cursor = 'grab';
});

projectsListWrapper.addEventListener('mouseover', (e) => {
    page.projectsWaiting = true;
});
projectsListWrapper.addEventListener('mouseout', (e) => (page.projectsWaiting = false));

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
    changeTransition('0s linear');
    skylineLightsColor.style.fill = 'var(--page1-color)';
    skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page1-color))`;
    moveSkyline();
}
function initCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    createStars(STAR_COUNT);
    drawStars();
}
function initProjects() {
    projectsListArr.forEach((project) => {
        let projectsListItemEl = document.createElement('li');
        projectsListItemEl.classList.add('projects-list-item');
        projectsListItemEl.id = 'projects-list-item';
        projectsList.append(projectsListItemEl);

        // let projectsListImageLinkEl = project.url
        //     ? document.createElement('a')
        //     : document.createElement('div');
        let projectsListImageLinkEl = document.createElement('div');
        // project.url && (projectsListImageLinkEl.href = project.url);
        // projectsListImageLinkEl.target = '_blank';
        // projectsListImageLinkEl.rel = 'noopener noreferrer';
        projectsListImageLinkEl.draggable = false;

        projectsListImageLinkEl.classList.add('projects-list-item-image-wrapper');
        projectsListImageLinkEl.style.backgroundImage = project.image;
        projectsListItemEl.append(projectsListImageLinkEl);

        let projectsListTextWrapperEl = document.createElement('div');
        projectsListTextWrapperEl.classList.add('projects-list-item-text-wrapper');
        projectsListItemEl.append(projectsListTextWrapperEl);

        let projectsListTextTitleEl = document.createElement('h2');
        projectsListTextTitleEl.classList.add('projects-list-item-text-title');
        projectsListTextTitleEl.innerText = project.title;
        projectsListTextWrapperEl.append(projectsListTextTitleEl);

        let projectsListTextSubtitleEl = document.createElement('ul');
        projectsListTextSubtitleEl.classList.add('projects-list-item-text-subtitle');
        projectsListTextWrapperEl.append(projectsListTextSubtitleEl);

        project.skills.forEach((skill) => {
            let projectsListTextSkillEl = document.createElement('li');
            projectsListTextSkillEl.classList.add(skill.class);
            projectsListTextSkillEl.innerText = skill.skill;
            projectsListTextSubtitleEl.append(projectsListTextSkillEl);
        });

        let projectsListTextDescEl = document.createElement('p');
        projectsListTextDescEl.classList.add('projects-list-item-text-desc');
        projectsListTextDescEl.innerText = project.description;
        projectsListTextWrapperEl.append(projectsListTextDescEl);

        let projectsListLinksEl = document.createElement('div');
        projectsListLinksEl.classList.add('projects-external-links-wrapper');
        projectsListTextWrapperEl.append(projectsListLinksEl);

        project.links.forEach((link) => {
            let projectsListLinkEl = document.createElement('a');
            link.href && (projectsListLinkEl.href = link.href);
            projectsListLinkEl.target = '_blank';
            projectsListLinkEl.rel = 'noopener noreferrer';
            projectsListLinkEl.draggable = false;
            projectsListLinkEl.innerHTML = link.icon;
            projectsListLinksEl.append(projectsListLinkEl);
        });

        projectsListChildren = document.querySelectorAll('.projects-list-item');
    });
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
            h: Math.random() > 0.5 ? getRandomArbitrary(190, 230) : getRandomArbitrary(350, 370),
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
        const x = getRandomArbitrary(2, 100);
        const cloudLeftDrifting = [
            { left: `${x + 100}%` },
            { left: `${getRandomArbitrary(-25, -15)}%` },
        ];
        const cloudRightDrifting = [
            { left: `${getRandomArbitrary(-25, -15)}%` },
            { left: `${x + 100}%` },
        ];
        const cloud = {
            x: x,
            y: getRandomArbitrary(25, 55),
            size: getRandomArbitrary(3, 10),
            opacity: getRandomArbitrary(0.95, 1),
            animationDuration: getRandomArbitrary(60000, 400000),
            animationDelay: getRandomArbitrary(-100000, -10000),
            zIndex: Math.floor(getRandomArbitrary(6, 10)),
            isFlipped: Math.random() > 0.5 ? false : true,
            cloudDrifting: Math.random() > 0.5 ? cloudLeftDrifting : cloudRightDrifting,
        };

        const cloudDriftingOptions = {
            duration: cloud.animationDuration,
            delay: cloud.animationDelay,
            iterations: Infinity,
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

        const cloudImg = document.createElement('img');
        cloudImg.src = `images/cloud${Math.round(getRandomArbitrary(1, 4))}.svg`;
        Object.assign(cloudImg.style, cloudStyles);
        cloudImg.animate(cloud.cloudDrifting, cloudDriftingOptions);
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

function changeTransition(transition) {
    skyline1.style.transition = transition;
    skyline2.style.transition = transition;
    skyline3.style.transition = transition;
    skylineLights.style.transition = transition;
}

//  Change Classes
function changeClass(elementsRemoveArr, removeClassArr, elementsAddArr, addClass) {
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
    mouse.dragX = 0;

    switch (page.currentPage) {
        case 1:
            //  Screen Transitions
            deactivatePage(pagesArr[page.prevPage - 1], homeContainer, exitStyle, enterStyle);
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
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
                ['page2-color', 'page3-color', 'page4-color'],
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
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
            changeTransition('1s ease-in-out 0.1s');
            moveSkyline();
            skylineLightsColor.style.fill = 'var(--page1-color)';
            skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page1-color))`;
            break;
        case 2:
            //  Screen Transitions
            deactivatePage(pagesArr[page.prevPage - 1], aboutContainer, exitStyle, enterStyle);

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
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
                ['page1-color', 'page3-color', 'page4-color'],
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
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
            changeTransition('1s ease-in-out 0.1s');
            moveSkyline();
            skylineLightsColor.style.fill = 'var(--page2-color)';
            skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page2-color))`;
            break;
        case 3:
            //  Screen Transitions
            deactivatePage(pagesArr[page.prevPage - 1], projectsContainer, exitStyle, enterStyle);

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
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
                ['page1-color', 'page2-color', 'page4-color'],
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
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
            changeTransition('1s ease-in-out 0.1s');
            moveSkyline();
            skylineLightsColor.style.fill = 'var(--page3-color)';
            skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page3-color))`;
            break;
        case 4:
            //  Screen Transitions
            deactivatePage(pagesArr[page.prevPage - 1], contactContainer, exitStyle, enterStyle);

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
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
                ['page1-color', 'page2-color', 'page3-color'],
                [logoLastName, aboutNavText, projectsNavText, contactNavText],
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
            changeTransition('1s ease-in-out 0.1s');
            moveSkyline();
            skylineLightsColor.style.fill = 'var(--page4-color)';
            skylineLightsColor.style.filter = `drop-shadow(0 0 ${LIGHT_SIZE}px var(--page4-color))`;
            break;

        default:
            break;
    }
}
