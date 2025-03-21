<template>
    <div class="three1-list">
        <div class="three1-list-title">了解不同领域的大疆产品</div>
        <div class="three1-list-box">
            <div class="three1-list-item">
                <img :src="threeList" class="three1-list-item-img" alt="">
                <div class="three1-list-item-title">专业影像</div>
                <div class="three1-list-item-description">天地一体的专业拍摄解决方案</div>
                <a-link class="three1-list-item-link" href="">了解更多 > </a-link>
            </div>
            <div class="three1-list-item">
                <img :src="threeList" class="three1-list-item-img" alt="">
                <div class="three1-list-item-title">专业影像</div>
                <div class="three1-list-item-description">天地一体的专业拍摄解决方案</div>
                <a-link class="three1-list-item-link" href="">了解更多 > </a-link>
            </div>
            <div class="three1-list-item">
                <img :src="threeList" class="three1-list-item-img" alt="">
                <div class="three1-list-item-title">专业影像</div>
                <div class="three1-list-item-description">天地一体的专业拍摄解决方案</div>
                <a-link class="three1-list-item-link" href="">了解更多 > </a-link>
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

.three1-list {
    @include width($mainWidth);
    @include margin(15, auto);
    text-align: center;
}

.three1-list-box{
    display: flex;
    justify-content: space-between;
}
.three1-list-title{
    @include font(40);
    @include margin(40, 0);
    font-weight: bold;
    text-align: center;
}
.three1-list-item{
    @include height(512);
    position: relative;
    width: getUnit(32%, "customize");
}
.three1-list-item-img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 0;
    height: 100%;
}
.three1-list-item *:not(img){
    position: relative;
    z-index: 100;
}
.three1-list-item-title{
    @include padding(48,0,0,0);
    @include font(30);
    font-weight: bold;
    color: $defaultColor;
}
.three1-list-item-description{
    @include padding(16,0,16,0);
    @include font(16);
    color: $defaultColor;
}
.three1-list-item-link{
    @include font(16);
    color: $defaultColor;
    &:hover{
        color: $defaultColor;  
        text-decoration: underline;
    }
}
</style>
