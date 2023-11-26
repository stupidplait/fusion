'use strict';

function startValidate(event) {
    event.preventDefault();

    const errorMessage = document.createElement('div');
    errorMessage.className = 'form__message';

    if (formValidate(this, errorMessage)) {
        sendForm(this, errorMessage);
    }

    showMessage(errorMessage);
}

function formValidate(form, message) {
    const formElements = form.querySelectorAll('*:not(h3, input[type="submit"])');
    let flag = true;

    formElements.forEach(input => {
        switch (input.name) {
            case 'userName':
                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter name</p>');
                    flag = false;
                } else if (input.value.length < 2) {
                    message.insertAdjacentHTML('beforeend', '<p>Name must be more than 2 symbols</p>');
                    flag = false;
                } else if (input.value.length > 64) {
                    message.insertAdjacentHTML('beforeend', '<p>Name must be less than 64 symbols</p>');
                    flag = false;
                }

                break;
            case 'login':
                const regexLogin = /[a-zA-Z0-9-]+/;

                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter login</p>');
                    flag = false;
                } else if (!regexLogin.test(input.value)) {
                    message.insertAdjacentHTML('beforeend', '<p>Allowed symbols in login: a-z, A-Z, -</p>');
                    flag = false;
                } else if (input.value.length < 2) {
                    message.insertAdjacentHTML('beforeend', '<p>Login must be more than 2 symbols</p>');
                    flag = false;
                } else if (input.value.length > 64) {
                    message.insertAdjacentHTML('beforeend', '<p>Login must be less than 64 symbols</p>');
                    flag = false;
                }

                break;
            case 'email':
                const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter email</p>');
                    flag = false;
                } else if (!regexEmail.test(input.value)) {
                    message.insertAdjacentHTML('beforeend', '<p>Incorrect email</p>');
                    flag = false;
                } else if (input.value.length > 256) {
                    message.insertAdjacentHTML('beforeend', '<p>Email must be less than 256 symbols</p>');
                    flag = false;
                }

                break;
            case 'phone':
                const regexPhone = /^8[0-9]{10}$/;

                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter phone</p>');
                    flag = false;
                } else if (!regexPhone.test(input.value)) {
                    message.insertAdjacentHTML('beforeend', '<p>Allowed only RU phone numbers</p>');
                    flag = false;
                }

                break;
            case 'password':
                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter password</p>');
                    flag = false;
                } else if (input.value.length < 6) {
                    message.insertAdjacentHTML('beforeend', '<p>Password must be more than 6 symbols</p>');
                    flag = false;
                }

                break;
            case 'repeatPassword':
                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Repeat password</p>');
                    flag = false;
                } else if (form['password'].value != input.value) {
                    message.insertAdjacentHTML('beforeend', '<p>Passwords must match</p>');
                    flag = false;
                }

                break;
            case 'oldPassword':
                if (form['newPassword'].value.length && !input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter old password</p>');
                    flag = false;
                }

                break;
            case 'userImage':
                const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'];

                if (input.files.length && !allowedTypes.includes(input.files[0].type)) {
                    message.insertAdjacentHTML('beforeend', '<p>Incorrect file type</p>');
                    flag = false;
                }

                break;
            case 'productName':
                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter name</p>');
                    flag = false;
                } else if (input.value.length < 2) {
                    message.insertAdjacentHTML('beforeend', '<p>Name must be more than 2 symbols</p>');
                    flag = false;
                } else if (input.value.length > 128) {
                    message.insertAdjacentHTML('beforeend', '<p>Name must be less than 128 symbols</p>');
                    flag = false;
                }

                break;
            case 'about':
                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter about</p>');
                    flag = false;
                } else if (input.value.length < 8) {
                    message.insertAdjacentHTML('beforeend', '<p>About must be more than 8 symbols</p>');
                    flag = false;
                } else if (input.value.length > 512) {
                    message.insertAdjacentHTML('beforeend', '<p>About must be less than 512 symbols</p>');
                    flag = false;
                }

                break;
            case 'price':
                const regexDigits = /^\d+$/;

                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter price</p>');
                    flag = false;
                } else if (!regexDigits.test(input.value)) {
                    message.insertAdjacentHTML('beforeend', '<p>Allowed only digits in price</p>');
                    flag = false;
                } else if (input.value[0] == '0') {
                    message.insertAdjacentHTML('beforeend', '<p>Price can\'t start with 0</p>');
                    flag = false;
                } else if (input.value.length > 10) {
                    message.insertAdjacentHTML('beforeend', '<p>Too high price</p>');
                    flag = false;
                }

                break;
            case 'colorScheme':
            case 'materials':
            case 'elements':
                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter additional info</p>');
                    flag = false;
                } else if (input.value.length < 4) {
                    message.insertAdjacentHTML('beforeend', '<p>Additional info must be more than 4 symbols</p>');
                    flag = false;
                } else if (input.value.length > 64) {
                    message.insertAdjacentHTML('beforeend', '<p>Additional info must be less than 64 symbols</p>');
                    flag = false;
                }

                break;
            case 'userId':
                if (input.value == '0') {
                    message.insertAdjacentHTML('beforeend', '<p class="message__error">Select the user</p>');
                    flag = false;
                }

                break;
            case 'statusId':
                if (input.value == '0') {
                    message.insertAdjacentHTML('beforeend', '<p class="message__error">Select the status</p>');
                    flag = false;
                }

                break;
            case 'productId':
                if (input.value == '0') {
                    message.insertAdjacentHTML('beforeend', '<p class="message__error">Select the product</p>');
                    flag = false;
                }

                break;
            case 'categoryId':
                if (input.value == '0') {
                    message.insertAdjacentHTML('beforeend', '<p class="message__error">Select the category</p>');
                    flag = false;
                }

                break;
            case 'productImage':
                const allowedImages = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'];

                if (!input.files.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Select product image</p>');
                    flag = false;
                } else if (!allowedImages.includes(input.files[0].type)) {
                    message.insertAdjacentHTML('beforeend', '<p>Incorrect file type</p>');
                    flag = false;
                }

                break;
            case 'rating':
                const regexRating = /^\d+$/;

                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter review rating</p>');
                    flag = false;
                } else if (!regexRating.test(input.value)) {
                    message.insertAdjacentHTML('beforeend', '<p>Allowed only digits in rating</p>');
                    flag = false;
                } else if (input.value < 0 || input.value > 5) {
                    message.insertAdjacentHTML('beforeend', '<p>Rating should be between 0 and 5</p>');
                    flag = false;
                }

                break;
            case 'text':
                if (!input.value.length) {
                    message.insertAdjacentHTML('beforeend', '<p>Enter review text</p>');
                    flag = false;
                } else if (input.value.length < 8) {
                    message.insertAdjacentHTML('beforeend', '<p>Review text must be more than 8 symbols</p>');
                    flag = false;
                } else if (input.value.length > 256) {
                    message.insertAdjacentHTML('beforeend', '<p>Review text must be less than 256 symbols</p>');
                    flag = false;
                }

                break;
        }
    });

    return flag;
}

async function sendForm(form, message) {
    const formData = new FormData(form);
    formData.append(form.name, '');

    if (form.querySelector('input[type="file"]')) {
        const inputFile = form.querySelector('input[type="file"]');
        formData.append(inputFile.name, inputFile.files[0]);
    }

    if (form.name == 'editProduct') {
        formData.append('productId', document.querySelector('.popup.editProduct').getAttribute('data-index'));
    }

    if (form.name == 'makeReview') {
        formData.append('orderId', document.querySelector('.popup.makeReview').getAttribute('data-index'));
    }

    const response = await fetch('incl/validation.php', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const responseBody = await response.json();

        if (responseBody.flag) {
            message.insertAdjacentHTML('beforeend', `<p>${responseBody.result}</p>`);

            chooseDirection(form.name, responseBody);
        } else {
            for (let key in responseBody) {
                if (key == 'flag') continue;

                message.insertAdjacentHTML('beforeend', `<p>${responseBody[key]}</p>`);
            }
        }
    } else {
        message.insertAdjacentHTML('beforeend', `<p>Sorry, we have an error :(</p>`);
        chooseDirection();
    }
}

function showMessage(message) {
    if (!document.body.lastElementChild.classList.contains('form__message')) {
        document.body.append(message);
    }

    message.animate({
        translate: '-50% 30%',
        opacity: '1',
    }, { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' });

    setTimeout(() => {
        message.animate({
            translate: '-50% -100%',
            opacity: '0'
        }, { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' });

        setTimeout(() => {
            message.remove();
        }, 1000);
    }, 3000);
}

function chooseDirection(formName, response = {}) {
    switch (formName) {
        case 'signup':
            Array.from(authenticationTabs.children).forEach(tab => tab.classList.toggle('active'));
            authenticationForms.forEach(form => {
                form.style.translate = '-100% 0';
                form.classList.toggle('active');
            });
            break;
        case 'signin':
            setTimeout(() => document.location.href = "./", 2000);
            break;
        case 'consultateModal':
            document.querySelector('.modal').style.display = 'flex';
            document.querySelector('.popup').style.display = '';
            document.querySelector('.popup__form').reset();

            let timerId = setTimeout(() => {
                document.querySelector('.modal').style.display = '';
                document.body.style.overflow = '';
                document.querySelector('.navigation').style.display = '';
                document.querySelector('.header__logo').style.display = '';
                document.body.style.paddingRight = '';
                document.querySelector('.services__btn').style.transform = '';

                clearInterval(timerId);
            }, 2000);

            break;
        case 'updateProfile':
            document.querySelector('.profile__menu .profile__subtitle').innerHTML = 'Hello, ' + document.querySelector('.profile__content.active input[name="userName"]').value;
            break;
        case 'addCategory':
            document.querySelector(`form[name="${formName}"`).reset();
            document.querySelector('.popup.addCategory').style.display = '';
            document.body.style.overflow = '';
            document.querySelector('.navigation').style.display = '';
            document.querySelector('.header__logo').style.display = '';
            document.body.style.paddingRight = '';

            document.querySelector('.profile__categories').insertAdjacentHTML('beforeend', `
                <p data-index="${response.id}" class="profile__category catalog__category">
                    ${response.name}
                    <a href="#" class="deleteCategory__btn action">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1L0.999999 11" stroke="rgb(var(--clr-black))" stroke-linecap="round"/>
                            <path d="M1 1L11 11" stroke="rgb(var(--clr-black))" stroke-linecap="round"/>
                        </svg>
                    </a>
                </p>
            `);

            break;
        case 'addProduct':
            document.querySelector(`form[name="${formName}"`).reset();
            document.querySelector('.file__hint').innerHTML = 'Image name';
            document.querySelector('.popup.addProduct').style.display = '';
            document.body.style.overflow = '';
            document.querySelector('.navigation').style.display = '';
            document.querySelector('.header__logo').style.display = '';
            document.body.style.paddingRight = '';

            document.querySelector('.orders__items').insertAdjacentHTML('beforeend', `
                <div data-index="${response.id}" class="orders__data">
                    <p>${document.querySelector('.orders__items').children.length}</p>
                    <a href="?page=catalog" class="orders__img">
                        <img src="${response.image}" alt="interior">
                    </a>
                    <p>${response.name}</p>
                    <p>${(+response.price).toLocaleString('ru-RU')} RUB</p>
                    <div class="orders__actions">
                        <a href="#" class="editProduct__btn action">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9357 13.028C23.6882 15.3662 22.7603 17.4459 21.1081 19.2297C19.2577 21.2274 16.9306 22.4979 14.13 22.9354C10.2431 23.5431 6.81738 22.5981 3.87858 20.1528C3.83474 20.1171 3.78956 20.0833 3.74438 20.0489C3.73899 20.0452 3.72887 20.047 3.71673 20.0452C3.65941 20.1134 3.69043 20.1935 3.69043 20.2673C3.68774 21.141 3.67155 22.0154 3.69515 22.8891C3.70122 23.1138 3.68437 23.4117 3.47734 23.6533C3.30673 23.8529 3.06194 23.9418 3.04913 23.9462C2.99653 23.9649 2.89673 23.9994 2.75984 24C2.67622 24.0006 2.60743 23.9887 2.55888 23.9768C2.41524 23.9274 2.21564 23.8366 2.06593 23.6576C1.89869 23.458 1.83598 23.1976 1.84003 22.8809C1.86161 21.305 1.84744 19.7285 1.84812 18.1525C1.84812 17.5586 2.04368 17.3014 2.64655 17.1149C4.40996 16.5679 6.17338 16.0202 7.93949 15.4795C8.63879 15.2654 9.26593 15.6841 9.21805 16.3313C9.18838 16.7231 8.94225 16.9715 8.5464 17.0942C7.53758 17.4078 6.52876 17.7194 5.51926 18.0318C5.19558 18.1325 4.87189 18.2345 4.52056 18.3447C4.87054 18.7277 5.25424 19.0494 5.66155 19.3442C7.779 20.8757 10.177 21.5842 12.8555 21.3595C16.0499 21.0916 18.5699 19.694 20.3927 17.2594C21.5242 15.748 22.0947 14.0425 22.1365 12.1937C22.1399 12.0454 22.1365 11.8977 22.183 11.7525C22.3058 11.3682 22.6706 11.1253 23.113 11.1404C23.529 11.1541 23.8858 11.4289 23.9613 11.815C24.0402 12.2194 23.9782 12.6268 23.9357 13.028Z" fill="rgb(var(--clr-black))"/>
                                <path d="M22.1409 5.90006C22.1382 6.38823 21.9217 6.68114 21.4322 6.83385C19.6377 7.39274 17.8419 7.94789 16.0448 8.4999C15.5512 8.65198 15.0906 8.49364 14.8748 8.11436C14.6658 7.74823 14.7676 7.29198 15.1135 7.03788C15.2477 6.93899 15.4075 6.89018 15.5667 6.84136C16.8297 6.44957 18.0928 6.05903 19.3558 5.66786C19.3855 5.65848 19.4145 5.64658 19.4786 5.62405C17.8979 4.07003 16.0172 3.09056 13.7884 2.72443C11.1025 2.28319 8.60474 2.77762 6.3423 4.17643C4.5155 5.30611 3.2221 6.85075 2.46549 8.77152C2.06425 9.79105 1.8606 10.8419 1.84778 11.9278C1.83969 12.5974 1.20581 13.0143 0.577989 12.7802C0.217213 12.6456 -0.00464657 12.3302 7.38561e-05 11.9259C0.0182812 10.2905 0.367593 8.71958 1.14242 7.24817C2.87279 3.96113 5.66054 1.85072 9.51915 1.10719C13.4425 0.351151 16.9518 1.26742 19.9837 3.71517C20.076 3.79027 20.1651 3.86851 20.2601 3.94924C20.3276 3.85974 20.2993 3.78026 20.2993 3.70578C20.302 2.77762 20.2939 1.84884 20.3033 0.920061C20.31 0.26353 20.8886 -0.145159 21.5151 0.0482325C21.9002 0.167147 22.1389 0.479453 22.1402 0.890645C22.1436 1.99091 22.1416 3.09118 22.1416 4.19145C22.1416 4.76099 22.1436 5.33052 22.1409 5.90006Z" fill="rgb(var(--clr-black))"/>
                            </svg>
                        </a>
                        <a href="#" class="deleteProduct__btn action">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.0701 3.20079C19.3832 3.19945 15.6962 3.20079 12.0093 3.20079C8.32242 3.20079 4.6169 3.20012 0.921395 3.20079C0.381602 3.20079 -0.00355478 3.54292 2.47434e-05 4.00734C0.00432017 4.45973 0.388761 4.79651 0.911372 4.79985C1.36597 4.80253 1.822 4.81455 2.2766 4.79451C2.52144 4.78382 2.57728 4.85064 2.57728 5.07583C2.57012 10.417 2.57012 15.7574 2.57227 21.0986C2.57227 22.7684 3.89097 23.998 5.68216 23.9987C9.89598 24.0007 14.1098 23.9987 18.3236 24C18.6558 24.0007 18.9808 23.9612 19.2987 23.8704C20.5866 23.5035 21.4271 22.4103 21.4278 21.0919C21.4278 15.7674 21.4278 10.4437 21.4278 5.11927C21.4278 4.90677 21.5461 4.80052 21.7829 4.80052C22.2296 4.80052 22.6756 4.80319 23.1223 4.79919C23.5103 4.79518 23.8232 4.59003 23.9463 4.26928C24.1561 3.72401 23.7308 3.20146 23.0701 3.20079ZM19.7139 21.0665C19.7139 21.9024 19.1798 22.3989 18.2821 22.3996C14.0869 22.3996 9.89168 22.3996 5.69648 22.3996C4.82093 22.3996 4.28615 21.8957 4.28615 21.0732C4.28543 18.4069 4.28543 15.7414 4.28543 13.0752C4.28543 10.4089 4.2883 7.72668 4.28042 5.05244C4.27971 4.84797 4.32695 4.79518 4.55246 4.79584C9.51512 4.80253 14.4778 4.80253 19.4411 4.79584C19.6545 4.79584 19.7203 4.82992 19.7196 5.04576C19.7125 10.3862 19.7139 15.726 19.7139 21.0665Z" fill="rgb(var(--clr-black))"/>
                                <path d="M16.285 0.790511C16.2914 1.2703 15.8977 1.59973 15.3142 1.6004C14.2089 1.6004 13.1028 1.6004 11.9967 1.6004C10.8907 1.6004 9.7853 1.6004 8.67995 1.6004C8.1108 1.59973 7.71992 1.27832 7.71491 0.80989C7.70918 0.328767 8.10078 0 8.68496 0C10.8964 0 13.1078 0 15.32 0C15.8891 0 16.2793 0.320748 16.285 0.789843V0.790511Z" fill="rgb(var(--clr-black))"/>
                                <path d="M10.0125 8.9021C10.0125 12.0408 10.0125 15.1794 10.0125 18.3181C10.0125 18.7878 9.71974 19.13 9.27587 19.1934C8.86351 19.2516 8.4533 19.001 8.32945 18.6181C8.29222 18.5038 8.29938 18.3876 8.29938 18.272C8.29938 16.715 8.29938 15.158 8.29938 13.6011C8.29938 12.0441 8.29938 10.4711 8.29938 8.90544C8.29938 8.35616 8.64731 7.99465 9.16419 8C9.66604 8.00601 10.0125 8.37086 10.0125 8.9021Z" fill="rgb(var(--clr-black))"/>
                                <path d="M15.6999 18.3669C15.6999 18.697 15.5503 18.9442 15.2431 19.1026C14.9618 19.2476 14.6747 19.2362 14.4041 19.0812C14.0948 18.9035 13.9817 18.6322 13.9824 18.2974C13.9874 16.3081 13.9846 14.3181 13.9846 12.3281C13.9846 11.1627 13.9824 9.99736 13.9867 8.8313C13.9882 8.39829 14.291 8.06685 14.7205 8.00604C15.1365 7.94791 15.5395 8.19382 15.6677 8.58005C15.7056 8.69432 15.6984 8.81059 15.6984 8.92619C15.6992 10.4832 15.6992 12.0401 15.6992 13.5964C15.6992 15.1527 15.6977 16.7772 15.6999 18.3669Z" fill="rgb(var(--clr-black))"/>
                            </svg>
                        </a>
                    </div>
                </div>
            `);

            break;
        case 'editProduct':
            document.querySelector('.popup.editProduct form').reset();
            document.querySelector('.popup.editProduct .file__hint').innerHTML = 'Image name';
            document.querySelector('.popup.editProduct').removeAttribute('data-index');
            document.querySelector('.popup.editProduct').style.display = '';
            document.body.style.overflow = '';
            document.querySelector('.navigation').style.display = '';
            document.querySelector('.header__logo').style.display = '';
            document.body.style.paddingRight = '';

            document.querySelector(`.orders__data[data-index="${response.id}"] img`).src = response.image;
            document.querySelector(`.orders__data[data-index="${response.id}"]>p:nth-of-type(2)`).innerHTML = response.name;
            document.querySelector(`.orders__data[data-index="${response.id}"]>p:last-of-type`).innerHTML = (+response.price).toLocaleString('ru-RU') + ' RUB';

            break;
        case 'createOrder':
            document.querySelector('.popup.createOrder form').reset();
            document.querySelectorAll('.popup.createOrder select[name="productId[]"]').forEach((select, i) => i ? select.remove() : select);
            document.querySelector('.popup.createOrder').style.display = '';
            document.body.style.overflow = '';
            document.querySelector('.navigation').style.display = '';
            document.querySelector('.header__logo').style.display = '';
            document.body.style.paddingRight = '';

            if (response.statusName == 'Pending') {
                document.querySelector('.profile__content.active .orders__items:has(.orders__sublist)').insertAdjacentHTML('beforeend', `
                    <div data-index="${response[0].order.id}" class="orders__data">
                        <div class="orders__information">
                            <p>${document.querySelector('.orders__sublist').children.length}</p>
                            <p>${response[0].order.name}</p>
                            <p>${(+response[0].order.total).toLocaleString('ru-RU')} RUB</p>
                            <p>${response[0].order.statusName}</p>
                            <div class="orders__actions">
                                <a href="#" class="acceptOrder__btn action">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8L6 15" stroke="rgb(var(--clr-black))" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M15 1L6 15" stroke="rgb(var(--clr-black))" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </a>
                                <a href="#" class="deleteOrder__btn action">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L15 15" stroke="rgb(var(--clr-black))" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M15 1L1 15" stroke="rgb(var(--clr-black))" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="orders__sublist">
                            ${response[0].orderItems.reduce((currentItem, orderItem, i) => currentItem + `
                                <div data-index="${orderItem.productId}?>" class="orders__data">
                                    <p>${i + 1}</p>
                                    <a href="?page=catalog" class="orders__img">
                                        <img src="${orderItem.image}" alt="interior">
                                    </a>
                                    <p>${orderItem.name}</p>
                                    <p>${orderItem.category}</p>
                                    <p>${(+orderItem.price).toLocaleString('ru-RU')} RUB</p>
                                </div>
                            `, '')}
                        </div>
                    </div>
                `);
            }

            break;
        case 'makeReview':
            document.querySelector('.popup.makeReview form').reset();
            document.querySelector('.popup.makeReview').removeAttribute('data-index');
            document.querySelector('.popup.makeReview').style.display = '';
            document.body.style.overflow = '';
            document.querySelector('.navigation').style.display = '';
            document.querySelector('.header__logo').style.display = '';
            document.body.style.paddingRight = '';

            sendRequest('2');

            break;
    }
}

// forms
const forms = document.querySelectorAll('form:not([name="search"], [name="deleteProduct"])');
const inputFiles = document.querySelectorAll('input[type="file"]');

forms.forEach(form => form.addEventListener('submit', startValidate));

inputFiles.forEach(inputFile => inputFile.addEventListener('change', function () {
    if (this.parentElement.querySelector('img')) {
        this.parentElement.querySelector('img').src = URL.createObjectURL(this.files[0]);
        document.querySelector('.profile__img>img').src = URL.createObjectURL(this.files[0]);
    } else if (this.parentElement.querySelector('.file__hint')) {
        this.parentElement.querySelector('.file__hint').innerHTML = this.files[0].name;
    }
}));

// magnetic buttons
const buttons = document.querySelectorAll('.btn:not(.services__btn, .catalog__btn)');

buttons.forEach(button => button.addEventListener('mousemove', function (event) {
    const buttonSizes = this.getBoundingClientRect();

    const mouseX = event.clientX - buttonSizes.x - buttonSizes.width / 2;
    const mouseY = event.clientY - buttonSizes.y - buttonSizes.height / 2;

    const translateX = mouseX * 0.2;
    const translateY = mouseY * 0.2;

    this.style.translate = `${translateX}px ${translateY}px`;
}));

buttons.forEach(button => button.addEventListener('mouseleave', () => button.style.translate = ''));

// theme change
document.body.dataset.theme = localStorage.getItem('theme') || 'light';

document.querySelector('.navigation__link:last-child').onclick = (event) => {
    event.preventDefault();

    if (document.body.dataset.theme == 'dark') {
        document.body.dataset.theme = 'light';
    } else {
        document.body.dataset.theme = 'dark';
    }

    localStorage.setItem('theme', `${document.body.dataset.theme}`);
};

// logo while scrolling
const headerLogo = document.querySelector('.header__logo');
let scrollPosition = window.scrollY;

window.addEventListener('scroll', function () {
    if (scrollPosition < window.scrollY) {
        headerLogo.style.top = '-2.5rem';
    } else {
        headerLogo.style.top = '';
    }

    scrollPosition = window.scrollY;
});