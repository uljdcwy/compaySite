<template>
    <div class="three-list">
        <div class="three-list-head">
            <div class="three-list-head-title">应用场景</div>
            <div class="three-list-head-description">
                为行业合作伙伴及500强企业提供RISC-V AIoT产品整体解决方案
            </div>
        </div>
        <div class="three-list-box">
            <div class="three-list-item">
                <img class="three-list-item-image" :src="threeList" alt="">
                <div class="three-list-item-title">家电控制</div>
                <div class="three-list-item-description">全屋智能、智能安防、智能照明、智能厨房系统</div>
            </div>
            <div class="three-list-item">
                <img class="three-list-item-image" :src="threeList" alt="">
                <div class="three-list-item-title">电机应用</div>
                <div class="three-list-item-description">智能风控、智能家电、智能环保</div>
            </div>
            <div class="three-list-item">
                <img class="three-list-item-image" :src="threeList" alt="">
                <div class="three-list-item-title">消费电子</div>
                <div class="three-list-item-description">智能手机、平板电脑、智能穿戴设备、无人机、机器人</div>
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
.three-list{
    @include width($mainWidth);
    @include margin(15, auto);
    text-align: center;
}
.three-list-box{
    display: flex;
    justify-content: space-between;
}
.three-list-head-title{
    font-size: getUnit(36);
    font-weight: bold;
    line-height: getUnit(54);
}
.three-list-head-description{
    font-size: getUnit(16);
    line-height: getUnit(54);
    @include padding(0, 0, 45, 0);
}
.three-list-item{
    width: getUnit(32%, "customize")
}
.three-list-item .three-list-item-image{
    width: getUnit(100%, "customize");
}
.three-list-item-title{
    @include margin(13, auto, auto, auto);
}
.three-list-item-title{
    line-height: getUnit(45);
    font-size: getUnit(18);
}
.three-list-item-description{
    line-height: 1.5;
    font-size: getUnit(14);
}
</style>
