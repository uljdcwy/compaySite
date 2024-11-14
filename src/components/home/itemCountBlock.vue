<template>
    <div ref="countEl" v-if="$t('vueIndex.countblock')" class="count-block">
        <div class="main-content">
            <template v-for="(item, index) in JSON.parse(decodeURIComponent($t('vueIndex.countblock')))">
                <div class="count-item">
                    <img class="count-image" :src="item.imageUrl" alt="">
                    <div class="count-number">
                        <span ref="countNumberEl">{{ item.countNum }}</span><span class="count-unit">{{ item.unit }}</span>
                    </div>
                    <div class="count-describe">{{ item.describe }}</div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onBeforeMount, ref, effect } from "vue";
import { isClient } from "@/utils/utils";
import { useI18n } from "vue-i18n";
import { onUnmounted } from "vue";

const isClientStatus = isClient();
const countEl = ref();
const t = useI18n();


const countNumberEl = ref();

/**
* @type {{ (this: Window, ev: Event): any; (): void; (this: Window, ev: Event): any; }}
*/
/**
* @type {() => void}
*/
let eventList,countStart,timer;
if (isClientStatus) {
    const countArr = [];
    onMounted(() => {
        let elTop = countEl.value.offsetTop;
        let startPosition = scrollY + Math.floor(innerHeight / 2) + 200;

        if (startPosition > elTop) {
            countStart();
        } else {
            window.addEventListener("scroll", eventList)
        }
    });

    eventList = () => {
        let elTop = countEl.value.offsetTop + (countEl.value.offsetHeight / 2 ) - 15;
        let startPosition = scrollY + innerHeight;
        if (startPosition > elTop) {
            countStart();
            window.removeEventListener("scroll", eventList);
        }
    };

    countStart = () => {
        countNumberEl.value.forEach((el, idx) => {
            countArr.push(Number(el.innerText));
        });

        let count = 0;
        let allCount = 2000;
        timer = setInterval(() => {
            count += 50;

            if (count > allCount) {
                clearInterval(timer)
                return;
            }


            countArr.forEach((/**@type {any} */el, idx) => {
                countNumberEl.value[idx].innerText = Math.floor((countArr[idx] * (count / allCount)));
            });


        }, 50);
    };

    onUnmounted(() => {
        clearInterval(timer);
        window.removeEventListener("scroll", eventList);
    });
}



</script>

<style lang="scss" scoped="scoped">
@use "@/scss/class" as *;
@use "@/scss/theme" as *;

.count-block {
    .main-content {
        @include width($mainWidth);
        @include margin(15, auto);
        @include padding(15, 0);
        display: flex;
        justify-content: space-between;

        .count-item {
            @include padding(15);
            @include margin(0, 10);
            box-sizing: border-box;
            background-color: $defaultBGColor;
            max-width: 50%;
            text-align: center;
            flex: 1;

            .count-image {
                @include margin(15, 0);
            }
        }

        .count-number {
            font-weight: bold;
            @include font(46);
            @include margin(0, 15, 10, 15);
            @include padding(0, 0, 5, 0);
            @include border(solid, $defaultBGColor, 0, 0, 1, 0)
        }

        .count-describe {
            @include padding(10, 0);
            @include font(14);
        }

        .count-unit {
            @include font(14);
            font-weight: 500;
        }
    }
}


@media screen and (max-width: 1024px) {
    .count-block {
        .main-content {
            width: 100%;
            flex-wrap: wrap;

            .count-item {
                flex: none;
                width: calc(50% - 10px);
                @include margin(5);
                @include padding(5);
                .count-image {
                    @include margin(5, 0);
                }
            }
        }
    }
}
</style>
