<template>
    <header class="header">
        <div class="header-content">
            <img class="logo-img" :src="$t('vueHeader.logoUrl')" alt="logo名称" />
            <nav class="nav-block" :class="isOpen ? 'phone-open' : ''">
                <ul class="nav-list">
                    <template v-for="(item, index) in JSON.parse(decodeURIComponent($t('vueHeader.navList')))">
                        <li class="nav-item" @mouseenter="enterChildNavHeight(item, index)"
                            @mouseleave="leaveChildNavHeight()">
                            <a-link :query="item.query" :params="item.params" class="nav-link" :href="item.link">{{ item.title }}</a-link>
                            <i v-if="item.childList" class="iconfont icon-arrow"
                                :class="(defaultChildNavHeight != '0px' && currentOpenIndex == index) ? 'arrow-down' : ''"
                                @click="switchChildNav(item.childList, index)"></i>

                            <div v-if="item.childList" class="child-content"
                                :class="currentOpenIndex == index ? 'open-child-nav' : ''">
                                <template v-for="(childItem, idxN) in item.childList">
                                    <dl class="child-nav">
                                        <dt v-if="childItem.title" class="child-title">{{ childItem.title }}</dt>
                                        <template v-for="(childItemContent, idx) in childItem.childNav">
                                            <dd class="child-link"><a-link :query="childItemContent.query" :params="childItemContent.params" :href="childItemContent.link">{{ childItemContent.title }}</a-link>
                                            </dd>
                                        </template>
                                    </dl>
                                </template>
                            </div>
                        </li>
                    </template>
                </ul>
            </nav>
            <div class="header-other">
                <div class="tabs-lang">
                    <select v-model="lang" @change="changeI18n">
                        <template v-for="(item, index) in langList">
                            <option :value="item.lang">{{ item.text }}</option>
                        </template>
                    </select>
                </div>
                <div @mouseenter="showInput" :class="searchShow ? 'show-input' : ''"
                    class="search-icon">
                    <input ref="inputEl" :placeholder="$t('vueHeader.searchPlaceholder')" @blur="phoneBlurHide"
                        v-model="searchInput" type="text" class="serach-input" @keyup.enter="keyupEnter">
                    <i @click="searchStart" @touchstart="phoneSearchStart" class="iconfont icon-sousuo"></i>
                </div>
                <div class="tel">
                    {{ $t('vueHeader.tel') }}
                </div>
            </div>
            <div class="phone-opera-nav" :class="isOpen ? 'isOpen' : ''" @click="switchOpen">
                <div class="nav-line-first"></div>
                <div class="nav-line-two"></div>
                <div class="nav-line-three"></div>
                <div class="nav-show-bg"></div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { langList } from "@/vueI18n/data.js";
import { isClient } from "@/utils/utils.js";
import { useRoute, useRouter } from 'vue-router';


const t = useI18n();
const lang = ref();
const emits = defineEmits(['search']);
const isPhone = ref(false);
const searchShow = ref(false);

const route = useRoute();
const router = useRouter();

const inputEl = ref();

const searchInput = ref();
const defaultChildNavHeight = ref("0px");
const isOpen = ref(false);

const currentOpenIndex = ref(-1);


const changeI18n = (/** @type {any} */ e) => {
    t.locale.value = lang.value;
    router.replace({ path: route.path, query: { lang:  lang.value} })
    localStorage.setItem("lang", lang.value);
};

const showInput = (/** @type {any} */ event) => {
    if (isPhone.value) return;
    searchShow.value = true;
    inputEl.value.focus();
}

const phoneBlurHide = () => {
    searchShow.value = false;
}

const keyupEnter = () => {
    if (searchShow.value) {
        searchStart();
    }
}

const hideInput = () => {
    if (isPhone.value) return;
    searchShow.value = false;
    inputEl.value.blur();
}

const searchStart = () => {
    if (isPhone.value) return;
    emits('search', searchInput.value);
}

const phoneSearchStart = () => {
    if (searchShow.value) {
        emits('search', searchInput.value);
    } else {
        searchShow.value = true;
        inputEl.value.focus();
    }
}

const enterChildNavHeight = (/** @type {{ childList: any; }} */ item, /** @type {number} */ idx) => {
    if (!isPhone.value && item.childList) {
        defaultChildNavHeight.value = "300px";
    }
    currentOpenIndex.value = idx;
}

const leaveChildNavHeight = () => {
    defaultChildNavHeight.value = "0px";
    currentOpenIndex.value = -1;
}

const switchOpen = () => {
    if (!isOpen.value) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
    isOpen.value = !isOpen.value;
};

const switchChildNav = (/** @type {any[]} */ childNavList, /** @type {number} */ idx) => {
    if (parseInt(defaultChildNavHeight.value) > 0) {
        defaultChildNavHeight.value = 0 + "px";
        currentOpenIndex.value = -1;
    } else {
        let childNavHeight = 0;
        childNavList.forEach((/** @type {{ childNav: any[]; }} */ el) => {
            childNavHeight += 33;
            el.childNav.forEach((/** @type {any} */ elem) => {
                childNavHeight += 22;
            })
        });
        currentOpenIndex.value = idx;
        defaultChildNavHeight.value = childNavHeight + "px";
    }
};

// @ts-ignore
const disabledScale = (event) => {
    if (event.touches.length > 1) {
        event.preventDefault();
        return false;
    }
}

onMounted(() => {
    const langStr = localStorage.getItem("lang") || window._INIT_LANG_;
    t.locale.value = langStr;
    lang.value = langStr;
    isPhone.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.body.addEventListener('touchmove', disabledScale, false);
})

onUnmounted(() => {
    document.body.removeEventListener('touchmove', disabledScale, false);
})


</script>
<style lang="scss" scoped>
@import "@/scss/class.scss";
@import "@/scss/theme.scss";

.phone-opera-nav {
    display: none
}

.header {
    @include padding(70, 0, 0, 0);

    &:after {
        content: "";
        display: block;
        @include height(70);
        background-color: $phoneFixedBg;
        @include position(fixed, 0, 0, auto, 0);
        @include border(solid, $borderColor, 0, 0, 1, 0);
        z-index: 100;
    }
}

.header-content {
    @include position(fixed, 0, 0, auto, 0);
    width: getUnit($mainWidth);
    @include padding(10, 0, 0, 0);
    @include margin(0, auto);
    box-sizing: border-box;
    display: flex;
    @include height(70);
    line-height: getUnit(70);
    font-weight: bold;
    @include font(14);
    z-index: 999;

    .logo-img {
        height: 100%;
    }

    .header-other {
        display: flex;
    }

    .search-icon {
        @include margin(0, 10);
        @include position(relative, auto, auto, auto, auto);
    }

    .search-icon.show-input .serach-input {
        @include width(220);
        @include padding(0, 10);
        @include border(solid, $borderColor, 1);
    }

    .serach-input {
        @include position(absolute, 0, 0, auto, auto);
        z-index: 10;
        transition: width 0.3s ease;
        @include width(0);
        @include padding(0);
        outline: none;
        border: none;
        @include borderRadius(5);
        background-color: $searchInput;
        top: 50%;
        @include height(30);
        margin-top: getUnit(5);
        line-height: getUnit(30);
        @include font(12);
        transform: translateY(-50%);
    }

    .icon-sousuo {
        @include font(22);
        @include position(relative, auto, auto, auto, auto);
        z-index: 100;
        cursor: pointer;
    }

    .tel {}

    .nav-block {
        @include margin(auto, 10, auto, auto);
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: end;
        position: relative;
    }

    .nav-list {
        display: flex;

        .iconfont {
            display: none;
        }

        .nav-item {

            @include padding(0, 20)
        }
    }

    .child-content.open-child-nav {
        height: v-bind(defaultChildNavHeight);
    }

    .child-content {
        @include position(absolute, 60, 0, auto, 0);
        background-color: $navChildBGColor;
        display: flex;
        @include height(0);
        justify-content: space-between;
        overflow: hidden;
        transition: height 0.3s ease;
        box-sizing: border-box;
        @include borderRadius(10)
    }


    .child-nav {
        line-height: 1.5;
        font-weight: 100;
        @include font(12);
        @include padding(25, 20);
        width: 33%;
        box-sizing: border-box;
    }

    .child-title {
        @include font(14);
        font-weight: bold;
        @include padding(3, 0)
    }

    .child-link {
        @include padding(2, 0)
    }
}


@media screen and (max-width: 1024px) {
    .arrow-down {
        transform: rotate(90deg);
    }

    .header-other {
        line-height: getUnit(40)
    }

    .phone-opera-nav {
        display: inline-block;
        box-sizing: border-box;
        @include padding(5, 11);
        @include width(60);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .nav-line-first {
            transform-origin: right;
            @include height(3);
            background-color: $navPhoneBGColor;
            @include borderRadius(3);
            transition: transform 0.3s ease;
        }

        .nav-line-two {
            @include height(3);
            background-color: $navPhoneBGColor;
            @include borderRadius(3);
            @include margin(0, auto);
            width: 100%;
            transition: width 0.3s ease;
        }

        .nav-line-three {
            transform-origin: right;
            @include height(3);
            background-color: $navPhoneBGColor;
            @include borderRadius(3);
            transition: transform 0.3s ease;
        }

        &.isOpen {
            .nav-line-first {
                transform: rotate(-45deg);
            }

            .nav-line-two {
                @include width(0);
            }

            .nav-line-three {
                transform: rotate(45deg);
            }
        }
    }

    .icon-arrow {
        transition: transform 0.3s ease;
    }

    .header-content {
        max-width: 100%;
        margin-right: 0;
        @include height(50);
        line-height: getUnit(50);
        @include padding(5, 0);

        .serach-input {
            margin-top: getUnit(0);
        }
    }

    .header {
        @include padding(50, 0, 0, 0);

        &:after {
            @include height(50);
        }
    }

    .tel {
        display: none;
    }

    .phone-open .nav-list {
        @include width(220);
    }

    .nav-show-bg {
        display: none;
        @include position(fixed, 50, 0, 0, 0);
        background-color: $defaultBGColor;
        z-index: -1
    }

    .isOpen .nav-show-bg {
        display: block
    }

    .nav-list {
        flex-direction: column;
        @include width(0);
        overflow: hidden;
        @include position(fixed, 50, 0, 0, auto);
        background-color: $navPhoneBGColor;
        transition: width 0.3s ease;
        overflow-y: scroll;

        .a-link {
            color: $navPhoneColor;
        }

        .nav-item {
            @include width(180);
            @include border(solid, $borderColor, 0, 0, 1, 0);

            .iconfont {
                display: inline-block;
                color: $navPhoneColor;
                float: right;
                @include width(40);
                text-align: center;
                margin-right: getUnit(-20)
            }

            &:last-child {
                border: none;
            }
        }
    }

    .nav-item .child-content {
        flex-direction: column;
        position: static;
        background-color: transparent;

        .child-title {
            color: $navPhoneColor;
        }

        .child-link {
            padding-left: getUnit(10);
        }

        .child-nav {
            width: 100%;
            @include padding(3, 10);
        }
    }
}
</style>