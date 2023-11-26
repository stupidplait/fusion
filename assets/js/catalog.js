'use strict';

window.addEventListener('load', function () {
    async function showProducts(name, counter = 0, resetFlag = true) {
        const categories = {
            action: 'showProducts',
            indexes: currentIndexes,
            name: name,
            counter: counter
        }

        const response = await fetch('incl/actions.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(categories)
        });

        const message = document.createElement('div');
        message.className = 'form__message';

        if (response.ok) {
            const responseBody = await response.json();

            insertProducts(responseBody, resetFlag);
        } else {
            message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

            showMessage(message);
        }
    }

    function insertProducts(products, resetFlag) {
        if (resetFlag) catalogBody.innerHTML = '';

        if (product.length % 4) footerObserver.unobserve(document.querySelector('footer'));

        if (products.length) {
            products.forEach(product => catalogBody.insertAdjacentHTML('beforeend', `
                <div data-id="${product.id}" class="catalog__item">
                    <div data-source="${product.image}" class="catalog__image">
                        <img src="assets/img/common/image-placeholder.png" alt="interior-1">
                        <h4 class="catalog__name">${product.name}</h4>
                    </div>
                    <div class="catalog__buttons">
                        <a href="#" class="catalog__btn btn">
                            <p>Add To Cart</p>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_477_5)">
                                    <path
                                        d="M15.9986 12.5162C15.9511 11.0058 15.8838 9.49635 15.8257 7.9864C15.7729 6.56522 15.7225 5.14451 15.6654 3.72381C15.6504 3.34441 15.646 2.96406 15.5482 2.59087C15.1453 1.05324 13.7874 0.00429668 12.1733 0.00191055C9.4318 -0.00190727 6.69031 0.00143332 3.94931 0.000478864C3.73768 0.000478864 3.52751 0.0114551 3.31733 0.0357937C1.86208 0.202823 0.572453 1.44982 0.386491 2.88389C0.294478 3.59305 0.309007 4.30841 0.278982 5.02139C0.217478 6.47168 0.164692 7.92245 0.110453 9.37275C0.0697742 10.4546 -0.00189863 11.537 3.8474e-05 12.6188C0.00342841 14.4686 1.55699 15.9881 3.43162 15.9943C6.51113 16.0048 9.59016 15.9976 12.6697 15.9967C13.0038 15.9967 13.3293 15.9375 13.6455 15.832C15.0644 15.3591 16.0456 13.9894 15.9986 12.5162ZM13.2445 14.763C13.0474 14.8232 12.8459 14.8551 12.6392 14.8551C9.58386 14.8551 6.52856 14.858 3.47327 14.8537C2.15022 14.8518 1.10564 13.7709 1.15504 12.469C1.27029 9.42524 1.38701 6.38149 1.50372 3.33821C1.55117 2.10744 2.55411 1.14678 3.80742 1.14487C6.60895 1.14057 9.41049 1.1401 12.212 1.14487C13.5506 1.14726 14.5114 2.08787 14.554 3.40263C14.6044 4.93644 14.6673 6.47025 14.7249 8.00406C14.7259 8.00406 14.7264 8.00406 14.7274 8.00358C14.7816 9.46628 14.8387 10.9285 14.8886 12.3912C14.9254 13.4726 14.2358 14.4605 13.2445 14.763Z"
                                        fill="#ede8ec" />
                                    <path
                                        d="M12.054 2.85C12.1005 4.73934 10.6341 6.48217 8.74254 6.78855C8.49169 6.82912 8.24083 6.85918 7.98659 6.85632C5.75892 6.85298 3.95692 5.10203 3.93755 2.92158C3.93368 2.52453 4.1424 2.29116 4.50561 2.28639C4.87366 2.28162 5.09013 2.50592 5.09691 2.89963C5.12161 4.39478 6.24561 5.57974 7.75994 5.70716C9.24425 5.83171 10.5557 4.85101 10.8443 3.39642C10.8801 3.21603 10.8932 3.03182 10.8961 2.84666C10.9019 2.50019 11.1363 2.2821 11.485 2.28639C11.8225 2.29069 12.0458 2.51164 12.054 2.85Z"
                                        fill="#ede8ec" />
                                </g>
                            </svg>
                        </a>
                        <a href="#" class="catalog__btn btn">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_450_3)">
                                    <path
                                        d="M13.6152 2.3424C13.7479 2.42022 13.9667 2.63964 14.0449 2.77213C14.1864 3.01188 14.223 3.64412 14.2089 3.89731C14.1032 5.79762 14.0339 7.00406 13.9294 8.90395C13.8999 9.43604 13.6571 10.0375 13.1831 10.0799C12.6907 10.1237 12.5375 9.49972 12.5639 8.98019C12.6129 8.00279 12.6631 7.2265 12.7164 6.24929L12.8181 4.42869L10.175 7.07179L3.92766 13.3191C3.4471 13.7997 2.91206 14.2258 2.5368 13.8505C2.16154 13.4752 2.58763 12.9402 3.06819 12.4596L9.3155 6.21232L11.9586 3.56922L10.138 3.67086C8.87134 3.73967 7.86222 3.79794 7.40709 3.82334C6.95195 3.84874 6.27923 3.70691 6.30731 3.20415C6.33539 2.7014 7.02819 2.48331 7.48333 2.45789L12.49 2.17837C12.737 2.16384 13.3814 2.20536 13.6152 2.3424Z"
                                        fill="#ede8ec" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            `));
        }

        if (!document.querySelectorAll('.catalog__item').length) catalogBody.insertAdjacentHTML('beforeend', '<h4 class="catalog__subtitle">NOTHING FOUND</h4>');
    }

    async function addToCart(productId) {
        const product = {
            action: 'addToCart',
            productId: productId
        };

        const response = await fetch('incl/actions.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const message = document.createElement('div');
        message.className = 'form__message';

        if (response.ok) {
            const responseBody = await response.json();

            message.insertAdjacentHTML('beforeend', `<p>${responseBody.message}</p>`);

            showMessage(message);
        } else {
            message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

            showMessage(message);
        }
    }

    async function showProduct(productId) {
        const product = {
            action: 'showProduct',
            id: productId
        };

        const response = await fetch('incl/actions.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const message = document.createElement('div');
        message.className = 'form__message';

        if (response.ok) {
            const responseBody = await response.json();

            insertProduct(responseBody);
            showReviews('Date ASC', productId);
        } else {
            message.insertAdjacentHTML('beforeend', '<p>Something went wrong</p>');

            showMessage(message);
        }
    }

    function insertProduct(product) {
        interior.querySelector('.product').insertAdjacentHTML('beforeend', `
            <div class="product__image-container">
                <h3 class="product__title">${product.name}</h3>
                <div class="product__image">
                    <img src="${product.image}" alt="interior">
                </div>
            </div>
            <div class="product__content">
                <div class="product__top">
                    <p class="product__category">${product.category}</p>
                    <a href="#" class="product__back">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2587 15.8763C14.899 15.9557 14.5331 16.0007 14.1617 16C11.5324 15.9972 8.90384 15.9993 6.27456 15.9986C5.76356 15.9986 5.38254 15.636 5.38529 15.154C5.38735 14.6706 5.76424 14.3165 6.28006 14.3165C8.78898 14.3165 11.2972 14.3102 13.8061 14.3193C15.0242 14.3235 16.1136 13.9743 16.9904 13.0988C18.2387 11.8545 18.6493 10.3326 18.1528 8.63506C17.6658 6.96913 16.5262 5.95102 14.8495 5.57863C14.5716 5.5175 14.2903 5.48518 14.007 5.48518C10.3474 5.48377 6.68721 5.48518 3.02767 5.48518H2.897C2.89769 5.58987 2.97884 5.62289 3.02767 5.67348C3.72437 6.38735 4.42931 7.09349 5.11982 7.81369C5.59849 8.31325 5.3736 9.09036 4.71336 9.24704C4.43482 9.31379 4.17828 9.23791 3.97815 9.03555C2.72919 7.76872 1.48229 6.50048 0.242956 5.22451C-0.0789128 4.89357 -0.0816639 4.39681 0.238829 4.06658C1.49054 2.77866 2.74776 1.49637 4.01185 0.221099C4.32202 -0.0922727 4.84609 -0.0627624 5.15145 0.247799C5.47195 0.57452 5.47814 1.1043 5.14458 1.44929C4.43963 2.18002 3.72505 2.90092 3.01392 3.62533C2.97128 3.66889 2.92244 3.70543 2.87637 3.74477C2.88462 3.76374 2.89218 3.78271 2.90044 3.80239H3.17623C6.81857 3.80239 10.4616 3.80098 14.1039 3.80239C16.9581 3.80379 19.4677 5.9974 19.9203 8.88027C20.4333 12.1531 18.4224 15.1751 15.2587 15.8763Z" fill="rgb(var(--clr-accent))"/>
                        </svg>
                    </a>
                </div>
                <p class="product__text">${product.about}</p>
                <ul class="product__info">
                    <li><span>Color scheme:</span> ${product.colorScheme}</li>
                    <li><span>Main materials:</span> ${product.materials}</li>
                    <li><span>Accent elements:</span> ${product.elements}</li>
                </ul>
                <p class="product__price">${(+product.price).toLocaleString('ru-RU')} RUB</p>
                <a href="#" class="product__btn btn">Add To Cart</a>
            </div>
        `);
        interior.querySelector('.product').setAttribute('data-id', product.id);
    }

    async function showReviews(sortOption, productId) {
        const reviews = {
            action: 'showReviews',
            productId: productId,
            sort: sortOption
        };

        const response = await fetch('incl/actions.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(reviews)
        });

        const message = document.createElement('div');
        message.className = 'form__message';

        if (response.ok) {
            const responseBody = await response.json();

            insertReviews(responseBody);
        } else {
            message.insertAdjacentHTML('beforeend', `<p>Something went wrong</p>`);

            showMessage(message);
        }
    }

    function insertReviews(reviews) {
        interior.querySelector('.reviews__body').innerHTML = '';

        if (reviews.length) {
            reviews.forEach(reviewsItem => interior.querySelector('.reviews__body').insertAdjacentHTML('beforeend', `
                <div class="reviews__item">
                    <div class="reviews__top">
                        <div class="reviews__person">
                            <img src="${reviewsItem.image}" alt="user">
                        </div>
                        <div class="reviews__right">
                            <p class="reviews__name">${reviewsItem.name}</p>
                            <p class="reviews__date">${new Date(+reviewsItem.date).toLocaleString('ru-RU')}</p>
                            <div class="reviews__rating">
                                <p>${reviewsItem.rating}</p>
                                <svg width="16" height="16" viewBox="-1 -1 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.8148 6.60439C15.537 6.88653 15.2618 7.17119 14.9854 7.45458C14.1163 8.34616 13.2476 9.23774 12.3773 10.1281C12.315 10.1916 12.2858 10.2455 12.3021 10.3442C12.5719 11.9768 12.835 13.6103 13.1002 15.2439C13.1716 15.684 13.101 15.8332 12.7247 15.9854C12.7122 15.9883 12.6997 15.9929 12.6876 16H12.5936C12.47 15.9599 12.3539 15.9047 12.2399 15.8416C10.8717 15.0821 9.50147 14.3255 8.13415 13.5644C8.03601 13.5096 7.96418 13.5109 7.86604 13.5656C6.77185 14.1759 5.67683 14.7853 4.57763 15.3864C4.1909 15.5979 3.8213 15.8428 3.40618 16H3.31263C2.93342 15.8533 2.82484 15.6786 2.88331 15.3199C3.15435 13.6605 3.42288 12.0011 3.69768 10.3425C3.71397 10.2438 3.68474 10.1899 3.62251 10.126C2.50828 8.98569 1.39613 7.84332 0.282317 6.70262C0.173316 6.59143 0.0668206 6.47941 0 6.33646V6.08608C0.102319 5.84323 0.279394 5.7078 0.547511 5.69735C0.60932 5.69484 0.671129 5.68063 0.732938 5.67101C2.21301 5.44446 3.69351 5.21624 5.17442 4.99262C5.29386 4.97464 5.36235 4.93075 5.41581 4.81497C6.10865 3.32483 6.80902 1.83803 7.50479 0.349149C7.57913 0.190731 7.67518 0.0644972 7.85393 0.0201902C8.13332 -0.0491964 8.35675 0.0611533 8.48663 0.337446C9.1895 1.83469 9.89321 3.3311 10.5915 4.83043C10.6403 4.93535 10.7051 4.97422 10.8116 4.99053C12.3798 5.22753 13.9475 5.46871 15.5157 5.70571C15.7354 5.73873 15.8975 5.83612 15.9714 6.05306C16.0457 6.27209 15.9689 6.44806 15.8148 6.60439Z"
                                        fill="rgb(var(--clr-primary))"
                                        stroke="rgb(var(--clr-primary))" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p class="reviews__text">${reviewsItem.text}</p>
                </div>
            `));
        } else {
            interior.querySelector('.reviews__body').insertAdjacentHTML('beforeend', '<h4 class="reviews__subtitle">THERE IS NO REVIEWS</h4>');
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
            showReviews(targetOption.innerHTML, document.querySelector('.product').getAttribute('data-id'));
        } else {
            sortOptions.style.display = 'flex';
        }
    }

    // show products
    const catalogBody = document.querySelector('.catalog__body');

    let currentIndexes = [];
    let searchText = '';
    let counter = 0;

    showProducts(searchText);

    // select active category
    const slider = document.querySelector('.catalog__slider');
    const sliderCategories = slider.firstElementChild;

    sliderCategories.addEventListener('click', function (event) {
        const targetCategory = event.target.closest('.catalog__category');
        if (!targetCategory) return;

        targetCategory.classList.toggle('active');

        if (targetCategory.classList.contains('active')) currentIndexes.push(targetCategory.dataset.index);
        else currentIndexes.splice(currentIndexes.indexOf(targetCategory.dataset.index), 1);

        showProducts(searchText);
    });

    // search by name
    const formSearch = document.querySelector('.catalog__form');
    const searchInput = formSearch['searchText'];

    formSearch.onsubmit = () => false;
    searchInput.addEventListener('input', function () {
        searchText = this.value;

        showProducts(searchText);
    });

    // show 1 product
    const catalog = document.querySelector('.catalog');
    const interior = document.querySelector('.interior');
    const product = interior.querySelector('.product');
    const reviewsBody = interior.querySelector('.reviews__body');

    let sort = null;

    catalogBody.addEventListener('click', function (event) {
        event.preventDefault();

        const targetBtn = event.target.closest('.catalog__btn');
        if (!targetBtn) return;

        const productId = targetBtn.closest('.catalog__item').dataset.id;

        if (targetBtn.querySelector('p')) {
            addToCart(productId);
        } else {
            interior.style.display = 'block';
            showProduct(productId);

            catalogBody.innerHTML = '';
            catalog.style.display = 'none';
            window.scrollTo(0, 0);
        }
    });

    interior.addEventListener('click', function (event) {
        event.preventDefault();

        const targetBtn = event.target.closest('.product__back') || event.target.closest('.product__btn');
        if (!targetBtn) return;

        if (targetBtn.classList.contains('product__back')) {
            product.innerHTML = '';
            reviewsBody.innerHTML = '';
            interior.style.display = '';

            catalog.style.display = '';

            showProducts(searchText);
        } else {
            addToCart(this.querySelector('.product').getAttribute('data-id'));
        }
    });

    // mutation Observer
    const mutationObs = new MutationObserver(mutationRecords => {
        mutationRecords.forEach(record => {
            switch (record.target.className) {
                case 'catalog__body':
                    if (record.addedNodes[1]) {
                        observerItems.observe(record.addedNodes[1]);
                        observerImages.observe(record.addedNodes[1].querySelector('img'));
                    }

                    break;
                case 'interior':
                    if (record.oldValue) {
                        sort.removeEventListener('click', sortBy);

                        sort = null;
                    } else {
                        sort = document.querySelector('.reviews__options');

                        sort.addEventListener('click', sortBy);
                        sort.addEventListener('mouseleave', function () {
                            this.querySelector('div').style.display = '';
                        });
                    }

                    break;
            }
        });
    });

    mutationObs.observe(interior, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['style']
    });

    mutationObs.observe(catalogBody, {
        subtree: true,
        childList: true
    });

    const footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!document.querySelectorAll('.catalog__item').length) return;

                counter = document.querySelectorAll('.catalog__item').length;
                showProducts(searchText, counter, false);
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px'
    });

    footerObserver.observe(document.querySelector('footer'));
});