<template>
    <div class="image-text">
        <div class="image-text-box">
            <img class="image-text-image" :src="threeList" alt="">
            <div class="image-text-text">
                <div class="image-text-text-title">数字科技</div>
                <div class="image-text-text-description">
                    我们持续推动数字科技的创新与应用，在区块链、隐私计算、安全科技、分布式数据库等领域，不断研发蚂蚁链、OceanBase、蚁盾、SOFAStack、mPaaS等领先的科技产品。同时，持续将自身产品与服务，向行业与社会全面开放，携手各方为中小金融机构的数字化升级、服务业小微商家的数字化经营、产业链的数字化协作贡献力量。
                </div>
                <a-link class="image-text-link" href=""> 查看更多 ></a-link>
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
    .image-text-box {
        @include position(relative);
        @include width($mainWidth);
        @include margin(15, auto);
        @include padding(45, 0, 0, 0);
        display: flex;

        .image-text-image {
            @include position(absolute, 0, 0, 0, 0);
            @include width(660);
            @include height(440);
        }

        .image-text-text {
            @include width(1010);
            @include height(440);
            @include borderRadius(10);
            @include padding(50,48,48);
            @include margin(0, 0, 0, auto);
            box-sizing: border-box;
            background-color: #efefef;
        }

        .image-text-text-title {
            font-weight: bold;
            @include font(28);
            @include width(430);
            @include margin(0, 0, 26, auto);
        }

        .image-text-text-description {
            @include font(16);
            @include width(430);
            @include margin(0, 0, 0, auto);
        }

        .image-text-link {
            display: block;
            @include border(solid, #ccc, 1);
            @include width(194);
            @include height(42);
            @include margin(120, 0, 0, auto);
            text-align: center;
            line-height: getUnit(42);
        }
    }
}
</style>