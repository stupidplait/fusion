'use strict';

function changeActive(arrow, currentImage) {
    if (arrow.classList.contains('arrow-left')) {
        if (currentImage == imagesArray[0]) imagesArray.at(-1).classList.add('active');
        else imagesArray[imagesArray.indexOf(currentImage) - 1].classList.add('active');
    } else {
        if (currentImage == imagesArray.at(-1)) imagesArray[0].classList.add('active');
        else imagesArray[imagesArray.indexOf(currentImage) + 1].classList.add('active');
    }

    currentImage.classList.remove('active');
}

function calculateMargin() {
    return `calc(${-100 * imagesArray.indexOf(imagesContainer.querySelector('.active'))}% - ${16 * imagesArray.indexOf(imagesContainer.querySelector('.active'))}px`;
}

function setPosition(event) {
    servicesButton.style.visibility = 'hidden';
    const elementBelow = document.elementFromPoint(event.clientX, event.clientY);
    servicesButton.style.visibility = '';

    servicesButton.animate({
        top: event.pageY - services.offsetTop + 'px',
        left: event.pageX + 'px'
    }, { duration: 500, fill: 'forwards', easing: 'ease-in' });

    if (!elementBelow.closest('.services__item')) {
        servicesButton.classList.remove('active');
        servicesButton.onclick = null;
        return;
    }

    servicesButton.classList.add('active');
}

function moveReviews(i) {
    reviewsElems.forEach(reviewsElem => reviewsElem.style.translate = `${-100 * i}%`);
}

function changeReviews() {
    reviewsContent.querySelector('.active').classList.remove('active');
    reviewsTabs.querySelector('.active').classList.remove('active');

    moveReviews(indexTab);

    reviewsElems[indexTab].classList.add('active');
    tabsElems[indexTab].classList.add('active');
}

function validateInput(input, errors) {
    switch (input.name) {
        case 'name':
            errors.firstElementChild.classList.toggle('correct', input.value.length >= 2);
            errors.lastElementChild.classList.toggle('correct', !~input.value.indexOf(' '));
            break;
        case 'phone':
            const regExp = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;

            errors.firstElementChild.classList.toggle('correct', regExp.test(input.value));
            errors.lastElementChild.classList.toggle('correct', (parseInt(input.value) && +input.value) || input.value.includes('0'));
            break;
    }
}

const scrollWidth = window.innerWidth - document.body.offsetWidth;

// banner
const bannerTitle = 'EXPLORE THE INTERIOR WITH US'.split(' ').map(word => `<span>${[...word].map((letter, i) => `<span style="animation-delay:${Math.floor(Math.random() * -6)}s; transition-delay:${(0.05 * i).toFixed(2)}s">${letter}</span>`).join('')}</span>`).join('');
const bannerTitleElem = document.querySelector('h1');
bannerTitleElem.insertAdjacentHTML('beforeend', bannerTitle);

// carousel
const imagesCarousel = document.querySelector('.latest__carousel');
const imagesContainer = imagesCarousel.querySelector('.latest__images');
const imagesArray = Array.from(imagesCarousel.querySelectorAll('.latest__image'));

imagesContainer.animate({
    marginLeft: calculateMargin()
}, { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.015)' });

imagesCarousel.addEventListener('click', function (event) {
    const arrow = event.target.closest('.latest__arrow');
    if (!arrow) return;

    event.preventDefault();

    let currentImage = imagesContainer.querySelector('.active');
    if (!currentImage) imagesContainer.firstElementChild.classList.add('active');

    changeActive(arrow, currentImage);

    imagesContainer.animate({
        marginLeft: calculateMargin()
    }, { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.015)' });
});

// services
const services = document.querySelector('.services');
const servicesItems = services.querySelectorAll('.services__item');
const servicesButton = services.querySelector('.services__btn');

servicesButton.onclick = function (event) {
    event.preventDefault();
};

services.onmouseenter = function (event) {
    setPosition(event);
    servicesButton.addEventListener('mousemove', setPosition);
    this.addEventListener('mousemove', setPosition);
};

services.onmouseleave = function () {
    servicesButton.removeEventListener('mousemove', setPosition);
    this.removeEventListener('mousemove', setPosition);
};

if (document.documentElement.offsetWidth <= 1055) {
    servicesButton.removeEventListener('mousemove', setPosition);
    services.removeEventListener('mousemove', setPosition);
    services.onmouseenter = null;
    services.onmouseleave = null;
}

// reviews
const reviewsContent = document.querySelector('.reviews__content');
const reviewsElems = reviewsContent.querySelectorAll('.reviews__element');
const reviewsBody = reviewsContent.querySelectorAll('.reviews__body');
const reviewsImage = reviewsContent.querySelector('.reviews__image');
const reviewsTabs = document.querySelector('.reviews__tabs');
const tabsElems = Array.from(reviewsTabs.children);

let indexTab = tabsElems.indexOf(reviewsTabs.querySelector('.active'));

moveReviews(indexTab);

if (window.innerWidth <= 940) {
    reviewsBody.forEach(body => body.style.maxHeight = '');
} else {
    reviewsBody.forEach(body => body.style.maxHeight = reviewsImage.offsetHeight + 'px');
}

reviewsTabs.addEventListener('click', function (event) {
    event.preventDefault();

    const targetTab = event.target.closest('.reviews__tab');
    if (!targetTab) return;
    if (targetTab.classList.contains('active')) return;

    indexTab = tabsElems.indexOf(targetTab);

    changeReviews();
});

reviewsBody.forEach(reviewsItem => reviewsItem.addEventListener('wheel', function (event) {
    if (window.innerWidth > 940) {
        event.preventDefault();

        this.scrollTop += event.deltaY / 5;
    }
}));

// faq
const faq = document.querySelector('.faq');

faq.addEventListener('click', function (event) {
    event.preventDefault();

    const faqButton = event.target.closest('.faq__button');
    if (!faqButton) return;

    const faqItem = faqButton.closest('.faq__item');
    faqItem.classList.toggle('active');

    const itemText = faqItem.lastElementChild;

    if (faqItem.classList.contains('active')) {
        itemText.style.height = `${itemText.scrollHeight}px`;
    } else {
        itemText.style.height = '';
    }
});

// popup and modal
const modal = document.querySelector('.modal');
const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');
const formInputs = form.querySelectorAll('input:not(input[type="submit"])');
const submitBtn = form.querySelector('input[type="submit"]');
const closeBtn = popup.querySelector('.popup__close');

servicesButton.addEventListener('click', function (event) {
    event.preventDefault();

    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.querySelector('.navigation').style.display = 'none';
    document.querySelector('.header__logo').style.display = 'none';
    document.body.style.paddingRight = scrollWidth + 'px';

    if (window.innerWidth >= 1055) this.style.transform = 'scale(0)';

    closeBtn.onclick = function (event) {
        event.preventDefault();

        popup.style.display = '';
        document.body.style.overflow = '';
        document.querySelector('.navigation').style.display = '';
        document.querySelector('.header__logo').style.display = '';
        document.body.style.paddingRight = '';
        servicesButton.style.transform = '';

        this.onclick = null;
    };
});

// window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1055) {
        servicesButton.removeEventListener('mousemove', setPosition);
        services.removeEventListener('mousemove', setPosition);
        services.onmouseenter = null;
        services.onmouseleave = null;

        servicesButton.animate({
            top: 0,
            left: 0
        }, { fill: 'forwards' });
    } else {
        services.onmouseenter = function (event) {
            setPosition(event);
            servicesButton.addEventListener('mousemove', setPosition);
            this.addEventListener('mousemove', setPosition);
        };

        services.onmouseleave = function () {
            servicesButton.removeEventListener('mousemove', setPosition);
            this.removeEventListener('mousemove', setPosition);
        };
    }

    if (window.innerWidth <= 940) {
        reviewsBody.forEach(body => body.style.maxHeight = '');
    } else {
        reviewsBody.forEach(body => body.style.maxHeight = reviewsImage.offsetHeight + 'px');
    }
});