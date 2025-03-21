<template>
    <div class="left-text-right-image">
        <div class="left-text-right-image-text-box">
            <div class="left-text-right-image-text-title">寻找您的全新保时捷或者保时捷认可易手车</div>
            <div class="left-text-right-image-text-description">
                每一辆保时捷车辆都像其车主一样独具个性，它总能将车主的个性淋漓展现。保时捷搜索引擎将协助您找到各保时捷中心的全新车及易手车。
            </div>
            <div class="left-text-right-image-text-link">
                <a-link href="">
                    寻找您的保时捷
                </a-link>
            </div>
        </div>
        <img class="left-text-right-image-image" :src="threeList" alt="">
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

.left-text-right-image {
    @include width($mainWidth);
    @include margin(15, auto);
    display: flex;
    flex-direction: row;
    text-align: center;
    overflow: hidden;
    @include borderRadius(5);

    .left-text-right-image-text-title {
        font-weight: bold;
        @include font(28);
    }

    background-color: $defaultBlack;

    .left-text-right-image-image {
        @include height(420);
        @include width(750);
    }

    .left-text-right-image-text-description {
        @include font(14);
        font-weight: bold;
        line-height: 1.5;
        @include margin(10,0,0,0);
    }
    .left-text-right-image-text-link{
        width: 168px;
        background-color: $defaultColor;
        @include borderRadius(10);
        text-align: center;
        @include margin(30,0,0,0);
        line-height: getUnit(54);
    }

    .left-text-right-image-text-box {
        @include padding(76, 40);
        color: $defaultColor;
        text-align: left;
        flex: 1;
        box-sizing: border-box;
    }
}
</style>