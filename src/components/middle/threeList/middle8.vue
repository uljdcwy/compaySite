<template>
    <div class="three3-list">
        <div class="three3-list-box">
            <div class="three3-list-item">
                <img class="three3-list-item-img" :src="threeList" alt="">
                <div class="three3-list-item-text">
                    <div class="three3-list-item-title">
                        五菱红标
                    </div>
                    <div class="three3-list-item-description">五菱品牌红色标识系列产品以“致敬每一代奋斗者”为品牌定位，致力于打造人民的创富神车。</div>
                    <a-link href="" class="three3-list-item-link">全部车型</a-link>
                </div>
            </div>
            <div class="three3-list-item">
                <img class="three3-list-item-img" :src="threeList" alt="">
                <div class="three3-list-item-text">
                    <div class="three3-list-item-title">
                        五菱红标
                    </div>
                    <div class="three3-list-item-description">五菱品牌红色标识系列产品以“致敬每一代奋斗者”为品牌定位，致力于打造人民的创富神车。</div>
                    <a-link href="" class="three3-list-item-link">全部车型</a-link>
                </div>
            </div>
            <div class="three3-list-item">
                <img class="three3-list-item-img" :src="threeList" alt="">
                <div class="three3-list-item-text">
                    <div class="three3-list-item-title">
                        五菱红标
                    </div>
                    <div class="three3-list-item-description">五菱品牌红色标识系列产品以“致敬每一代奋斗者”为品牌定位，致力于打造人民的创富神车。</div>
                    <a-link href="" class="three3-list-item-link">全部车型</a-link>
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

.three3-list {
    @include width($mainWidth);
    @include margin(25, auto);

    .three3-list-box {
        display: flex;
        justify-content: space-between;
        .three3-list-item-text{
            @include padding(50, 30)
        }

        .three3-list-item-title{
            @include font(34);
            font-weight: bold
        }
        .three3-list-item-description{
            @include font(15);
            @include height(108);
            @include margin(25,0,0,0);
            line-height: 1.3
        }

        .three3-list-item-img {
            @include height(150);
            @include width(100%, "customize")
        }
        .three3-list-item-link{
            @include height(42);
            @include width(160);
            @include border(solid, #ccc, 1);
            display: block;
            text-align: center;
            line-height: getUnit(42);
        }

        .three3-list-item {
            @include width(32%, "customize");
        }
    }
}
</style>