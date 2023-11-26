'use strict';

window.addEventListener('load', function () {
    function moveSlider(event) {
        if (!startPosition) return;
        if (!event.isPrimary) return;

        let difference;

        if (!previousPosition) {
            difference = startPosition - event.clientX;
        } else {
            difference = previousPosition - event.clientX;
        }

        previousPosition = event.clientX;

        let sliderTranslate = Math.abs(parseFloat(getComputedStyle(sliderCategories).translate)) || 0;
        let currentTranslate = sliderTranslate + difference * maximumPercentage * (sliderCategories.scrollWidth / sliderCategories.offsetWidth);

        if (currentTranslate > maximumTranslate) {
            sliderCategories.style.translate = `-${maximumTranslate}%`;
        } else if (currentTranslate < 0) {
            sliderCategories.style.translate = '';
        } else {
            sliderCategories.style.translate = `-${currentTranslate}%`;
        }
    }

    // categories touch-friendly slider
    const slider = document.querySelector('.catalog__slider');
    const sliderCategories = slider.firstElementChild;
    let maximumPercentage = 100 / (sliderCategories.offsetWidth);
    let maximumTranslate = (sliderCategories.scrollWidth - sliderCategories.offsetWidth) * maximumPercentage;
    let startPosition;
    let previousPosition;

    slider.addEventListener('pointerdown', function (event) {
        startPosition = event.clientX;

        slider.addEventListener('pointermove', moveSlider);
    });

    slider.addEventListener('pointerup', function () {
        startPosition = 0;
        previousPosition = 0;
        slider.removeEventListener('pointermove', moveSlider);
    });

    slider.addEventListener('pointerleave', function () {
        startPosition = 0;
        previousPosition = 0;
        slider.removeEventListener('pointermove', moveSlider);
    });

    slider.ondragstart = () => false;
    slider.onselectstart = () => false;

    const mutationObserver = new MutationObserver(mutationRecords => {
        if (mutationRecords[0].addedNodes.length) {
            maximumPercentage = 100 / sliderCategories.offsetWidth;
            maximumTranslate = (sliderCategories.scrollWidth - sliderCategories.offsetWidth) * maximumPercentage;

            if (parseFloat(sliderCategories.style.translate) < -maximumTranslate) {
                sliderCategories.style.translate = `-${maximumTranslate}%`;
            }
        } else if (mutationRecords[0].removedNodes.length) {
            maximumPercentage = 100 / sliderCategories.offsetWidth;
            maximumTranslate = (sliderCategories.scrollWidth - sliderCategories.offsetWidth) * maximumPercentage;

            if (parseFloat(sliderCategories.style.translate) < -maximumTranslate) {
                sliderCategories.style.translate = `-${maximumTranslate}%`;
            }
        }
    });

    mutationObserver.observe(sliderCategories, {
        childList: true,
        subtree: true
    });

    window.onresize = function () {
        maximumPercentage = 100 / sliderCategories.offsetWidth;
        maximumTranslate = (sliderCategories.scrollWidth - sliderCategories.offsetWidth) * maximumPercentage;

        if (parseFloat(sliderCategories.style.translate) < -maximumTranslate) {
            sliderCategories.style.translate = `-${maximumTranslate}%`;
        }
    };
});