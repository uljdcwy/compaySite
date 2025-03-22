<template>
    <div class="image-text">
        <div class="image-text-left">
            <img class="image-text-left-img" :src="threeList" alt="">
            <div class="image-text-text">
                <div class="image-text-text-description">冰趣系列丨自动制冰冰箱</div>
                <div class="image-text-text-title">时刻举杯 畅享冰趣</div>
            </div>
        </div>
        <div class="image-text-right">
            <div class="image-text-right-top">
                <div class="image-text-right-min-block">
                    <img class="image-text-right-min-block-img" :src="threeList" alt="">
                    <div class="image-text-text">
                        <div class="image-text-text-description">冰趣系列丨自动制冰冰箱</div>
                        <div class="image-text-text-title">时刻举杯 畅享冰趣</div>
                    </div>
                </div>
                <div class="image-text-right-max-block">
                    <img class="image-text-right-max-block-img" :src="threeList" alt="">
                    <div class="image-text-text">
                        <div class="image-text-text-description">冰趣系列丨自动制冰冰箱</div>
                        <div class="image-text-text-title">时刻举杯 畅享冰趣</div>
                    </div>
                </div>
            </div>
            <div class="image-text-right-bottom">
                <div class="image-text-right-max-block">
                    <img class="image-text-right-max-block-img" :src="threeList" alt="">
                    <div class="image-text-text">
                        <div class="image-text-text-description">冰趣系列丨自动制冰冰箱</div>
                        <div class="image-text-text-title">时刻举杯 畅享冰趣</div>
                    </div>
                </div>
                <div class="image-text-right-min-block">
                    <img class="image-text-right-min-block-img" :src="threeList" alt="">
                    <div class="image-text-text">
                        <div class="image-text-text-description">冰趣系列丨自动制冰冰箱</div>
                        <div class="image-text-text-title">时刻举杯 畅享冰趣</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import threeList from "@public/threeList.jpg";
import { onMounted } from "vue";

onMounted(() => {
})
</script>
<style lang="scss" scoped="scoped">
@use "@/scss/class" as *;
@use "@/scss/theme" as *;

.image-text {
    @include width($mainWidth);
    @include margin(15, auto);
    display: flex;
    justify-content: space-between;
    @include height(650);

    .image-text-text {
        @include position(absolute, 44, 0, 0, 0);
        text-align: center;
    }

    .image-text-text-description {
        @include font(14);
        line-height: getUnit(20);
    }

    .image-text-text-title {
        @include font(26);
        line-height: getUnit(30);
    }

    .image-text-left {
        height: 100%;
        @include position(relative);
        @include width(480);
        .image-text-left-img {
            height: 100%;
            width: 100%
        }
    }

    .image-text-right {
        @include width(700);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .image-text-right-max-block {
            @include width(395);
            @include height(320);
            @include position(relative);
        }

        .image-text-right-min-block-img,
        .image-text-right-max-block-img {
            height: 100%;
            width: 100%;
        }
        .image-text-right-bottom,
        .image-text-right-top{
            display: flex;
            justify-content: space-between;
        }

        .image-text-right-min-block {
            @include width(285);
            @include height(320);
            @include position(relative);
        }
    }
}
</style>