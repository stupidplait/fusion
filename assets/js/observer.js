'use strict';

const observerItems = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.animate({
                opacity: '1',
                translate: '0 0'
            }, { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' });

            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px 0px 20px 0px'
});

const observerImages = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.parentElement.dataset.source;
            entry.target.parentElement.removeAttribute('data-source');

            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px 0px 100px 0px'
});

if (document.querySelectorAll('.inspiration__item').length) {
    const inspirationItems = document.querySelectorAll('.inspiration__item');

    inspirationItems.forEach(item => observerItems.observe(item));
    inspirationItems.forEach(item => observerImages.observe(item.firstElementChild));
}