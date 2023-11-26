'use strict';

// authentication tabs
const authenticationTabs = document.querySelector('.authentication__tabs');
const authenticationForms = document.querySelectorAll('.authentication__form');

authenticationTabs.addEventListener('click', function (event) {
    const target = event.target.closest('.authentication__item');
    if (!target) return;
    if (target.classList.contains('active')) return;

    this.querySelector('.active').classList.remove('active');
    target.classList.add('active');

    authenticationForms.forEach(form => form.classList.toggle('active'));
    if (target == this.lastElementChild) authenticationForms.forEach(form => form.style.translate = '-100%');
    else authenticationForms.forEach(form => form.style.translate = '');
})