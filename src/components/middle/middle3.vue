<template>
    <div class="three2-list">
        <div class="three2-list-title">热卖专区</div>
        <div class="three2-list-box">
            <div class="three2-list-item">
                <a-link href="">
                    <img class="three2-list-item-img" :src="threeList" alt="">
                </a-link>
                <div class="three2-list-item-title">vivo Y36c</div>
                <div class="three2-list-item-description">高亮护眼屏</div>
                <div class="three2-list-item-price">￥ 1299.00</div>
            </div>
            <div class="three2-list-item">
                <a-link href="">
                    <img class="three2-list-item-img" :src="threeList" alt="">
                </a-link>
                <div class="three2-list-item-title">vivo Y36c</div>
                <div class="three2-list-item-description">高亮护眼屏</div>
                <div class="three2-list-item-price">￥ 1299.00</div>
            </div>
            <div class="three2-list-item">
                <a-link href="">
                    <img class="three2-list-item-img" :src="threeList" alt="">
                </a-link>
                <div class="three2-list-item-title">vivo Y36c</div>
                <div class="three2-list-item-description">高亮护眼屏</div>
                <div class="three2-list-item-price">￥ 1299.00</div>
            </div>
        </div>
    </div>
</template>
<script setup>
// @ts-ignore
import threeList from "@public/threeList.jpg";
import { ref } from "vue";
</script>
<style lang="scss" scoped="scoped">
@use "@/scss/class" as *;
@use "@/scss/theme" as *;

.three2-list {
    @include width($mainWidth);
    @include margin(25, auto);
    text-align: center;
}

.three2-list-box {
    display: flex;
    justify-content: space-between;
}

.three2-list-title {
    @include padding(38, 0, 25);
    @include font(24)
}

.three2-list-item {
    @include width(31%, "customize");
    @include padding(56, 0, 25);
    background-color: $defaultColor;
    transition: all .2s linear;
}

.three2-list-item:hover {
   @include boxShadow(rgba(0,0,0,.1), 0, 15, 30)
}

.three2-list-item-img {
    @include width(230);
    @include height(230);
}

.three2-list-item-title {
    @include padding(29, 0, 0, 0);
    @include font(20)
}

.three2-list-item-description {
    @include padding(8, 50, 52);
    @include font(14);
}

.three2-list-item-price {
    @include font(18);
    color: $redColor;
}
</style>
