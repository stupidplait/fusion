<!-- catalog -->
<section class="catalog">
    <div class="container">
        <div class="catalog__inner">
            <h2 class="catalog__title">CATALOG</h2>
            <form name="search" class="catalog__form">
                <label for="search">
                    <input class="catalog__input" type="text" id="search" name="searchText" placeholder="Search">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.7597 13.0058C13.3044 12.5645 12.2171 11.4951 12.0949 11.3772C12.0494 11.3333 12.0197 11.3048 12.0058 11.2911C11.9681 11.2548 11.9298 11.2184 11.8948 11.1794C11.7899 11.0639 11.7875 11.0147 11.8929 10.8975C12.2128 10.5413 12.4813 10.1497 12.715 9.73321C13.1109 9.02728 13.3645 8.27486 13.4718 7.47365C13.6887 5.85322 13.3358 4.35852 12.4324 2.99873C11.7951 2.03937 10.9479 1.29972 9.92136 0.762415C9.17614 0.372452 8.3837 0.133759 7.54934 0.0440448C6.06088 -0.116066 4.65893 0.157989 3.35703 0.904845C2.23012 1.55151 1.35613 2.4444 0.745627 3.58089C0.338844 4.33921 0.103095 5.15253 0.0268231 6.01333C-0.0679389 7.08532 0.0879066 8.1154 0.501954 9.1075C0.901473 10.0655 1.50868 10.8743 2.29748 11.5527C3.2725 12.3919 4.39644 12.9164 5.66896 13.1214C6.20946 13.2088 6.75393 13.2268 7.30368 13.1823C8.24074 13.1067 9.12397 12.8598 9.95504 12.4273C10.277 12.2596 10.5827 12.0651 10.8729 11.8474C11.0407 11.7217 11.073 11.7223 11.2193 11.871C12.0058 12.6702 12.8537 13.4099 13.6237 14.2252C14.179 14.8132 14.4158 15.0381 14.5558 15.1681C15.2132 15.7791 15.2726 15.9513 15.5169 15.9916C15.5572 15.9982 15.7817 16.0309 15.9089 15.8996C16.0482 15.7559 15.9884 15.5123 15.9805 15.4815C15.9425 15.3358 15.8517 15.2428 15.829 15.2195C15.1237 14.4959 14.4851 13.7091 13.7597 13.0058ZM10.4348 10.9231C9.61165 11.6018 8.6561 12.0068 7.59061 12.1542C6.35078 12.3258 5.17368 12.1306 4.06659 11.5583C3.00704 11.0108 2.20007 10.2034 1.64207 9.15399C1.3109 8.53057 1.10618 7.86426 1.0418 7.16619C0.931849 5.97404 1.16298 4.84704 1.78074 3.80878C2.41799 2.7381 3.31411 1.95391 4.46413 1.46278C5.45533 1.03942 6.48814 0.9055 7.5599 1.04989C8.49762 1.17661 9.3508 1.50763 10.1211 2.04952C11.1153 2.7489 11.809 3.6729 12.2178 4.81103C12.3914 5.29398 12.5271 6.08438 12.5182 6.62038C12.4793 8.36686 11.7865 9.80819 10.4348 10.9231Z"
                            fill="rgb(var(--clr-black))" />
                    </svg>
                </label>
            </form>
            <div class="catalog__slider">
                <div class="catalog__categories">
                    <?
                        $sql = "SELECT * FROM category";
                        $categories = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

                        foreach ($categories as $category) {?>
                            <p data-index="<?=$category['id']?>" class="catalog__category"><?=$category['name']?></p>
                        <?}
                    ?>
                </div>
            </div>
            <div class="catalog__body">
            </div>
        </div>
    </div>
</section>
<!-- interior -->
<section class="interior">
    <div class="container">
        <!-- product -->
        <div class="interior__product product">
        </div>
        <!-- reviews -->
        <div class="interior__reviews reviews">
            <h2 class="reviews__title">REVIEWS</h2>
            <div class="reviews__sort">
                <p>Sort by:</p>
                <div class="reviews__options">
                    <p class="selected">Date ASC</p>
                    <div>
                        <p>Date ASC</p>
                        <p>Date DESC</p>
                        <p>Rating ASC</p>
                        <p>Rating DESC</p>
                    </div>
                </div>
            </div>
            <div class="reviews__content">
                <div class="reviews__body">
                </div>
            </div>
        </div>
    </div>
</section>