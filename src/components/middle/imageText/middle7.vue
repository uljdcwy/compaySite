<template>
    <div class="image-text">
        <div class="image-text-container">
            <img class="image-text-img" :src="threeList" alt="">
            <div class="image-text-text">
                <div class="image-text-text-title">
                    <span class="image-text-text-tip">公告</span>
                    巨大集团连续三年蝉联「台湾国际品牌第六名」
                </div>
                <div class="image-text-text-description">
                    「2024年台湾国际品牌价值调查」，于今日（12/10）公布结果，巨大集团以7.44亿美元的品牌价值，再次荣登「台湾国际品牌第六名」。尽管受到市场波动影响，品牌</div>
                <div class="image-text-link-box">
                    <a-link href="">阅读更多</a-link>
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
    background-color: #140d8e;
    @include margin(30, 0);
    @include padding(30, 0);
    @include width(100%, "customize");
    .image-text-text{
        @include width(460)
    }
    .image-text-container {
        @include width($mainWidth);
        @include margin(15, auto);
        display: flex;
        justify-content: space-between;
        color: $defaultColor
    }
    .image-text-text-tip{
        @include font(12);
        @include padding(0, 10);
        background-color: #4a86e8;
        @include position(absolute, -20,auto,auto,0)
    }
    .image-text-text-title{
        @include margin(30, 0,0,0);
        @include font(30);
        font-weight: bold;
        @include position(relative)
    }
    .image-text-text-description{
        @include font(16);
        @include padding(10,0,5);
    }
    .image-text-img {
        @include height(450);
        @include width(650);
    }
    .image-text-link-box{
        @include height(40);
        @include width(184);
        line-height: getUnit(40);
        @include margin(15, 0,0,0);
        @include border(solid, #ccc, 1);
        text-align: center;
        :deep(a){
            color: inherit;
        }
    }
}
</style>