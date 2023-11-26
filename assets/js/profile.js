'use strict';

async function sendRequest(index) {
    const request = {
        action: selectAction(index)
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        const responseBody = await response.json();

        switch (profileContents[1].dataset.name) {
            case 'cart':
                insertCart(responseBody);
                break;
            case 'orders':
                insertOrders(responseBody);
                break;
        }
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

function selectAction(index) {
    switch (index) {
        case '1':
            profileContents[1].dataset.name = 'cart';
            return 'showCart';
        case '2':
            profileContents[1].dataset.name = 'orders';
            return 'showOrders';
    }
}

function insertCart(cart) {
    profileContents[1].innerHTML = '';

    if (cart.total) {
        profileContents[1].insertAdjacentHTML('beforeend', `
            <h4 class="profile__subtitle">Cart</h4>
            <div class="profile__orders orders">
                <div class="orders__item">
                    <div class="orders__info">
                        <div class="orders__left">
                            <p>№ ${cart.userId}-${cart.id}</p>
                            <p class="orders__date">${new Date().toLocaleDateString('ru-RU')}</p>
                        </div>
                        <h4 class="orders__total">Summary: ${(+cart.total).toLocaleString('ru-RU')} RUB</h4>
                    </div>
                    <div class="orders__progress">
                        <p class="current">In cart</p>
                        <p>Pending</p>
                        <p>Finished</p>
                        <p>Reviewed</p>
                    </div>
                    <div class="orders__list">
                        ${cart.cartItems.reduce((currentItem, cartItem, i) => currentItem + `
                            <div class="orders__product">
                                <p>${i + 1}</p>
                                <a href="?page=catalog" class="orders__img">
                                    <img src="${cartItem.image}" alt="interior">
                                </a>
                                <p class="orders__name">${cartItem.name}</p>
                                <p>${cartItem.price.toLocaleString('ru-RU')} RUB</p>
                            </div>
                        `, '')}
                    </div>
                    <div class="orders__bottom">
                        <a href="#" class="orders__btn pay__btn btn">Pay</a>
                        <a href="#" class="orders__btn cancel__btn btn">Cancel</a>
                    </div>
                </div>
            </div>
        `);
    } else {
        profileContents[1].insertAdjacentHTML('beforeend', `
            <h4 class="profile__subtitle">Cart</h4>
            <div class="profile__orders orders">
                <h4 class="profile__subtitle">Your cart is empty</h4>
            </div>
        `);
    }
}

async function makeOrder() {
    const request = {
        action: 'makeOrder'
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        const responseBody = await response.json();

        profileContents[1].innerHTML = '';

        profileContents[1].insertAdjacentHTML('beforeend', `
            <h4 class="profile__subtitle">Cart</h4>
            <div class="profile__orders orders">
                <h4 class="profile__subtitle">Your cart is empty</h4>
            </div>
        `);

        message.insertAdjacentHTML('beforeend', `<p>${responseBody.message}</p>`);

        showMessage(message);
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function deleteCart() {
    const request = {
        action: 'deleteCart'
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        profileContents[1].innerHTML = '';

        profileContents[1].insertAdjacentHTML('beforeend', `
            <h4 class="profile__subtitle">Cart</h4>
            <div class="profile__orders orders">
                <h4 class="profile__subtitle">Your cart is empty</h4>
            </div>
        `);
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function cancelOrder(orderIndex) {
    const request = {
        action: 'cancelOrder',
        orderId: orderIndex
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        const responseBody = await response.json();

        document.querySelector(`.orders__item[data-index="${orderIndex}"]`).remove();

        message.insertAdjacentHTML('beforeend', `<p>${responseBody.message}</p>`);

        showMessage(message);
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function insertOrders(orders) {
    profileContents[1].innerHTML = '';

    if (orders.length) {
        profileContents[1].insertAdjacentHTML('beforeend', `
            <h4 class="profile__subtitle">Orders</h4>
            <div class="profile__orders orders">
            </div>
        `);

        for (let order of orders) {
            profileContents[1].querySelector('.orders').insertAdjacentHTML('beforeend', `
                <div data-index="${order.order.id}" class="orders__item">
                    <div class="orders__info">
                        <div class="orders__left">
                            <p>№ ${order.order.userId}-${order.order.id}</p>
                            <p class="orders__date">${new Date(+order.order.date).toLocaleString('ru-RU')}</p>
                        </div>
                        <h4 class="orders__total">Summary: ${(+order.order.total).toLocaleString('ru-RU')} RUB</h4>
                    </div>
                    <div class="orders__progress">
                        <p>In cart</p>
                        <p ${order.order.statusId == 1 ? 'class="current"' : ''}>Pending</p>
                        <p ${order.order.statusId == 2 ? 'class="current"' : ''}>Finished</p>
                        <p ${order.order.statusId == 3 ? 'class="current"' : ''}>Reviewed</p>
                    </div>
                    <div class="orders__list">
                        ${order.orderItems.reduce((currentItem, orderItem, i) => currentItem + `
                            <div class="orders__product">
                                <p>${i + 1}</p>
                                <a href="?page=catalog" class="orders__img">
                                    <img src="${orderItem.image}" alt="interior">
                                </a>
                                <p class="orders__name">${orderItem.name}</p>
                                <p>${(+orderItem.price).toLocaleString('ru-RU')} RUB</p>
                            </div>
                        `, '')}
                    </div>
                    <div class="orders__bottom">
                        ${order.order.statusId == 1 ? '<a href="#" class="orders__btn cancelOrder__btn btn">Cancel</a>' : ''}
                        ${order.order.statusId == 2 ? '<a href="#" class="orders__btn review__btn btn">Review</a>' : ''}
                    </div>
                </div>
            `);
        }

        profileContents[1].insertAdjacentHTML('beforeend', `
        <section class="popup makeReview">
            <div class="container">
                <div class="popup__inner">
                    <h3 class="popup__title">MAKE A REVIEW</h3>
                    <form method="post" name="makeReview" class="popup__form form">
                        <textarea name="text" placeholder="Text"></textarea>
                        <input type="text" name="rating" placeholder="Rating">
                        <select name="productId">
                            <option value="0" selected hidden>Product</option>
                        </select>
                        <input type="submit" name="makeReview" class="form__btn btn">
                    </form>
                    <a href="#" class="popup__close">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_259_22223)">
                                <path d="M1 1L15 15" stroke="rgb(var(--clr-black))" stroke-width="2"
                                    stroke-linecap="round" />
                                <path d="M15 1L1 15" stroke="rgb(var(--clr-black))" stroke-width="2"
                                    stroke-linecap="round" />
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    `);
    } else {
        profileContents[1].insertAdjacentHTML('beforeend', `
            <h4 class="profile__subtitle">Orders</h4>
            <div class="profile__orders orders">
                <h4 class="profile__subtitle">You didn't order anything</h4>
            </div>
        `);
    }
}

function sortBy(event) {
    const sortOptions = this.querySelector('div');

    if (sortOptions.style.display) {
        const targetOption = event.target.closest('div>p');
        if (!targetOption) return;

        if (this.querySelector('.selected').innerHTML == targetOption.innerHTML) return;

        this.querySelector('.selected').innerHTML = targetOption.innerHTML;
        sortOptions.style.display = '';
    } else {
        sortOptions.style.display = 'flex';
    }
}

async function deleteCategory(index) {
    const request = {
        action: 'deleteCategory',
        categoryId: index
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        const responseBody = await response.json();

        document.querySelector(`.profile__category[data-index="${index}"]`).remove();

        message.insertAdjacentHTML('beforeend', `<p>${responseBody.message}</p>`);

        showMessage(message);
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function deleteProduct(index) {
    const request = {
        action: 'deleteProduct',
        productId: index
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        const responseBody = await response.json();

        document.querySelector(`.orders__data[data-index="${index}"]`).remove();

        message.insertAdjacentHTML('beforeend', `<p>${responseBody.message}</p>`);

        showMessage(message);
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function getProductInfo(index) {
    const request = {
        action: 'getProductInfo',
        productId: index
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    if (response.ok) {
        const responseBody = await response.json();

        for (let key in responseBody) {
            switch (key) {
                case 'name':
                    document.querySelector('.popup.editProduct input[name="productName"]').value = responseBody[key];
                    break;
                case 'image':
                    document.querySelector('.popup.editProduct .file__hint').innerHTML = responseBody[key];
                    break;
                case 'price':
                case 'elements':
                case 'materials':
                case 'colorScheme':
                case 'categoryId':
                case 'about':
                    document.querySelector(`.popup.editProduct [name="${key}"]`).value = responseBody[key];
                    break;
            }
        }
    } else {
        const message = document.createElement('div');
        message.className = 'form__message';
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function deleteOrder(index) {
    const request = {
        action: 'deleteOrder',
        orderId: index
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        const responseBody = await response.json();

        document.querySelector(`.orders__data[data-index="${index}"]:has(.orders__information)`).remove();

        message.insertAdjacentHTML('beforeend', `<p>${responseBody.message}</p>`);

        showMessage(message);
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function acceptOrder(index) {
    const request = {
        action: 'acceptOrder',
        orderId: index
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const message = document.createElement('div');
    message.className = 'form__message';

    if (response.ok) {
        const responseBody = await response.json();

        document.querySelector(`.orders__data[data-index="${index}"]:has(.orders__information)`).remove();

        message.insertAdjacentHTML('beforeend', `<p>${responseBody.message}</p>`);

        showMessage(message);
    } else {
        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

async function getOptions(index) {
    const request = {
        action: 'getOptions',
        orderId: index
    };

    const response = await fetch('incl/actions.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    if (response.ok) {
        const responseBody = await response.json();

        for (let product of responseBody) {
            document.querySelector('.popup.makeReview select').insertAdjacentHTML('beforeend', `
                <option value="${product.id}">${product.name}</option>
            `);
        }
    } else {
        const message = document.createElement('div');
        message.className = 'form__message';

        message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

        showMessage(message);
    }
}

const scrollWidth = window.innerWidth - document.body.offsetWidth;

const profileNav = document.querySelector('.profile__nav');
const profileLinks = Array.from(profileNav.querySelectorAll('.profile__link'));
const profileContents = document.querySelectorAll('.profile__content');
const profileTabs = document.querySelector('.profile__tabs');

profileNav.addEventListener('click', function (event) {
    const targetLink = event.target.closest('.profile__link:not([href="?exit"])');
    if (!targetLink) return;

    event.preventDefault();

    if (targetLink == this.querySelector('.active')) return;

    this.querySelector('.active').classList.remove('active');
    targetLink.classList.add('active');

    profileContents.forEach(content => content.classList.remove('active'));
    profileContents[['1', '2'].includes(targetLink.dataset.index) ? 1 : targetLink.dataset.index == 0 ? 0 : 2].classList.add('active');

    if (['0', '3'].includes(targetLink.dataset.index)) return;

    sendRequest(targetLink.dataset.index);
});

profileContents[1].addEventListener('click', function (event) {
    const targetBtn = event.target.closest('.orders__btn');
    if (!targetBtn) return;

    event.preventDefault();

    if (targetBtn.classList.contains('pay__btn')) makeOrder();
    else if (targetBtn.classList.contains('cancel__btn')) deleteCart();
    else if (targetBtn.classList.contains('cancelOrder__btn')) cancelOrder(targetBtn.closest('.orders__item').getAttribute('data-index'));
});

profileContents[1].addEventListener('click', function (event) {
    const makeReview = event.target.closest('.review__btn');
    if (!makeReview) return;

    event.preventDefault();

    document.querySelector('.popup.makeReview').style.display = 'flex';
    document.querySelector('.popup.makeReview').setAttribute('data-index', makeReview.closest('.orders__item').dataset.index);
    document.body.style.overflow = 'hidden';
    document.querySelector('.navigation').style.display = 'none';
    document.querySelector('.header__logo').style.display = 'none';
    document.body.style.paddingRight = scrollWidth + 'px';

    getOptions(makeReview.closest('.orders__item').dataset.index);

    document.querySelector('.popup.makeReview .popup__close').onclick = function (event) {
        event.preventDefault();

        document.querySelector('.popup.makeReview form').reset();
        document.querySelector('.popup.makeReview').removeAttribute('data-index');
        document.querySelector('.popup.makeReview').style.display = '';
        document.body.style.overflow = '';
        document.querySelector('.navigation').style.display = '';
        document.querySelector('.header__logo').style.display = '';
        document.body.style.paddingRight = '';

        this.onclick = null;
    };
});

const mutationObserver = new MutationObserver(mutationRecord => {
    if (document.querySelector('.popup.makeReview form')) {
        document.querySelector('.popup.makeReview form').addEventListener('submit', startValidate);
    }
});

mutationObserver.observe(profileContents[1], {
    childList: true,
    subtree: true
});

if (profileContents.length == 3) {
    profileTabs.addEventListener('click', function (event) {
        const targetTab = event.target.closest('.profile__subtitle');
        if (!targetTab) return;

        event.preventDefault();

        if (targetTab.classList.contains('.active')) return;

        this.querySelector('.active').classList.toggle('active');
        targetTab.classList.toggle('active');

        profileContents[2].querySelectorAll('.profile__orders').forEach((orders, i) => orders.classList.toggle('active', profileTabs.children[i] == targetTab));
    });

    profileContents[2].addEventListener('click', function (event) {
        const targetAction = event.target.closest('.action');
        if (!targetAction) return;

        event.preventDefault();

        if (targetAction.classList.contains('addCategory__btn')) {
            document.querySelector('.popup.addCategory').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.querySelector('.navigation').style.display = 'none';
            document.querySelector('.header__logo').style.display = 'none';
            document.body.style.paddingRight = scrollWidth + 'px';

            document.querySelector('.popup.addCategory .popup__close').onclick = function (event) {
                event.preventDefault();

                document.querySelector('.popup.addCategory form').reset();
                document.querySelector('.popup.addCategory').style.display = '';
                document.body.style.overflow = '';
                document.querySelector('.navigation').style.display = '';
                document.querySelector('.header__logo').style.display = '';
                document.body.style.paddingRight = '';

                this.onclick = null;
            };
        } else if (targetAction.classList.contains('addProduct__btn')) {
            document.querySelector('.popup.addProduct').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.querySelector('.navigation').style.display = 'none';
            document.querySelector('.header__logo').style.display = 'none';
            document.body.style.paddingRight = scrollWidth + 'px';

            document.querySelector('.popup.addProduct .popup__close').onclick = function (event) {
                event.preventDefault();

                document.querySelector('.popup.addProduct form').reset();
                document.querySelector('.popup.addProduct').style.display = '';
                document.body.style.overflow = '';
                document.querySelector('.navigation').style.display = '';
                document.querySelector('.header__logo').style.display = '';
                document.body.style.paddingRight = '';

                this.onclick = null;
            };
        } else if (targetAction.classList.contains('deleteProduct__btn')) {
            document.querySelector('.popup.deleteProduct').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.querySelector('.navigation').style.display = 'none';
            document.querySelector('.header__logo').style.display = 'none';
            document.body.style.paddingRight = scrollWidth + 'px';

            document.querySelector('.popup.deleteProduct form').onsubmit = function (event) {
                event.preventDefault();

                deleteProduct(targetAction.closest('.orders__data').dataset.index);

                document.querySelector('.popup.deleteProduct').style.display = '';
                document.body.style.overflow = '';
                document.querySelector('.navigation').style.display = '';
                document.querySelector('.header__logo').style.display = '';
                document.body.style.paddingRight = '';

                document.querySelector('.popup.deleteProduct .popup__close').onclick = null;
                this.onsubmit = null;
            };

            document.querySelector('.popup.deleteProduct .popup__close').onclick = function (event) {
                event.preventDefault();

                document.querySelector('.popup.deleteProduct').style.display = '';
                document.body.style.overflow = '';
                document.querySelector('.navigation').style.display = '';
                document.querySelector('.header__logo').style.display = '';
                document.body.style.paddingRight = '';

                this.onclick = null;
                document.querySelector('.popup.deleteProduct form').onsubmit = null;
            };
        } else if (targetAction.classList.contains('editProduct__btn')) {
            document.querySelector('.popup.editProduct').style.display = 'flex';
            document.querySelector('.popup.editProduct').setAttribute('data-index', targetAction.closest('.orders__data').dataset.index);
            document.body.style.overflow = 'hidden';
            document.querySelector('.navigation').style.display = 'none';
            document.querySelector('.header__logo').style.display = 'none';
            document.body.style.paddingRight = scrollWidth + 'px';

            getProductInfo(targetAction.closest('.orders__data').dataset.index);

            document.querySelector('.popup.editProduct .popup__close').onclick = function (event) {
                event.preventDefault();

                document.querySelector('.popup.editProduct form').reset();
                document.querySelector('.popup.editProduct').removeAttribute('data-index');
                document.querySelector('.popup.editProduct').style.display = '';
                document.body.style.overflow = '';
                document.querySelector('.navigation').style.display = '';
                document.querySelector('.header__logo').style.display = '';
                document.body.style.paddingRight = '';

                this.onclick = null;
            };
        } else if (targetAction.classList.contains('createOrder__btn')) {
            document.querySelector('.popup.createOrder').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.querySelector('.navigation').style.display = 'none';
            document.querySelector('.header__logo').style.display = 'none';
            document.body.style.paddingRight = scrollWidth + 'px';

            document.querySelector('.popup.createOrder .add__btn').onclick = function (event) {
                event.preventDefault();

                const selectAmount = document.querySelectorAll('.popup.createOrder select[name="productId[]"]').length + 1;
                const optionsAmount = document.querySelectorAll('.popup.createOrder select[name="productId[]"]:last-of-type>option').length;

                if (selectAmount >= optionsAmount) return;

                const selectClone = this.previousElementSibling.cloneNode(true);
                this.before(selectClone);
            };

            document.querySelector('.popup.createOrder .popup__close').onclick = function (event) {
                event.preventDefault();

                document.querySelector('.popup.createOrder form').reset();
                document.querySelector('.popup.createOrder').style.display = '';
                document.body.style.overflow = '';
                document.querySelector('.navigation').style.display = '';
                document.querySelector('.header__logo').style.display = '';
                document.body.style.paddingRight = '';

                this.onclick = null;
                document.querySelector('.popup.createOrder .add__btn').onclick = null;
            };
        } else if (targetAction.classList.contains('acceptOrder__btn')) acceptOrder(targetAction.closest('.orders__data:has(.orders__information)').dataset.index);
        else if (targetAction.classList.contains('deleteOrder__btn')) deleteOrder(targetAction.closest('.orders__data:has(.orders__information)').dataset.index);
        else if (targetAction.classList.contains('deleteCategory__btn')) deleteCategory(targetAction.closest('.profile__category').dataset.index);
    });

    profileContents[2].addEventListener('click', function (event) {
        const infoTarget = event.target.closest('.orders__data:has(.orders__information)');
        if (!infoTarget) return;

        const infoSublist = infoTarget.lastElementChild;

        if (infoSublist.style.height) {
            infoSublist.style.height = '';
        } else {
            infoSublist.style.height = infoSublist.scrollHeight + 'px';
        }
    });
}