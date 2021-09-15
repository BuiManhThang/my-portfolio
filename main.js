// toggle nav 
const navList = document.querySelector('.nav__list');
const navToggle = document.querySelector('.nav__toggle');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('nav__list--active');
})


// nav links

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('nav__list--active');
    })
})


// header

const headerText = document.querySelector('.header__text-animation');
const headerPointer = document.querySelector('.header__pointer');
let text = ['Web Developer', 'Frontend Developer'];
let headerIndex = 1;
let isWrite = true;
let timestamp = 100;
let delay = 0;
let textIndex = 0;

const setAnimation = (str) => {
    let headerTextLength = str[textIndex].length;
    if (isWrite) {
        if (headerIndex <= headerTextLength) {
            headerPointer.classList.remove('header__pointer--active');
            headerText.textContent = str[textIndex].slice(0, headerIndex);
            headerIndex += 1;
        } else {
            headerPointer.classList.add('header__pointer--active');
            headerText.textContent = str[textIndex];
            if (delay < 10) {
                delay++;
            } else {
                isWrite = false;
                delay = 0;
            }
        }
    } else {
        if (headerIndex > 0) {
            headerPointer.classList.remove('header__pointer--active');
            headerText.textContent = str[textIndex].slice(0, headerIndex);
            headerIndex -= 2;
        } else {
            headerText.textContent = '';
            isWrite = true;
            if (textIndex < str.length - 1) {
                textIndex += 1;
            } else {
                textIndex = 0;
            }
        }
    }
}

setInterval(() => {
    setAnimation(text);
}, timestamp);

// skills

const skills = document.querySelectorAll('.skill__line');
const appearHeight = 100;

window.addEventListener('scroll', () => {
    if (skills[1].getBoundingClientRect().y + appearHeight - window.innerHeight < 0) {
        skills.forEach(skill => {
            skill.classList.add('skill__line--active');
        })
    }
})

// projects

const controllerBtns = document.querySelectorAll('.controller__btn');
const projects = document.querySelectorAll('.project');

projects.forEach(project => {
    project.classList.add('project--active');
})

controllerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        controllerBtns.forEach(controllerBtn => {
            controllerBtn.classList.remove('controller__btn--active');
        })
        e.target.classList.add('controller__btn--active');
        projects.forEach(project => {
            if (project.getAttribute('value') === e.target.textContent.toLowerCase()) {
                project.classList.add('project--active');
                project.style.position = 'relative';
            } else {
                if (e.target.textContent.toLowerCase() === 'all') {
                    project.classList.add('project--active');
                    project.style.position = 'relative';
                } else {
                    project.classList.remove('project--active');
                }
            }
        })
    })
})

projects.forEach(project => {
    project.addEventListener('transitionend', () => { 
        if (project.classList.value.indexOf('project--active') === -1) {
            project.style.position = 'absolute';
        }
    })
})


// scroll to top


const education = document.querySelector('#education');
const scrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if(education.getBoundingClientRect().y + 100 - window.innerHeight < 0) {
        scrollToTop.classList.add('scroll-to-top--active');
    } else {
        scrollToTop.classList.remove('scroll-to-top--active');
    }
})

scrollToTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
})


// animation section

const sections = document.querySelectorAll('section');

const animationSection = () => {
    sections.forEach(section => {
        if(section.getBoundingClientRect().y + 100 - window.innerHeight < 0) {
            section.classList.add('section--active');
        } else {
            section.classList.remove('section--active');
        }
    })
}

animationSection();

window.addEventListener('scroll', animationSection)


const animationLinks = () => {
    let currentSection = sections[0];
    let min = Math.abs(sections[0].getBoundingClientRect().y);
    sections.forEach(section => {
        let currentValue = Math.abs(section.getBoundingClientRect().y);
        if(currentValue < min) {
            min = currentValue;
            currentSection = section;
        }
    })
    let currentLink;
    navLinks.forEach(link => {
        if(link.getAttribute('href') === '#' + currentSection.id) { 
            currentLink = link;
        }
        else if(currentSection.id === 'education' && link.getAttribute('href') === '#about') {
            currentLink = link;
        }
    })
    for(let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('nav__link--active');
    }
    currentLink.classList.add('nav__link--active');
}

window.addEventListener('scroll', animationLinks);