<template>
    <div class="image-text">
        <img class="image-text-bg" :src="threeList" alt="">
        <div class="image-text-title">
            了解JINS
        </div>
        <div class="image-text-description">点击了解JINS的品牌理念、四项承诺、镜框品质和镜片品质</div>
        <div class="image-text-link-box">
            <div class="image-text-link-text">
                <a-link href="">
                    > 了解JINS
                </a-link>
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
    @include height(410);
    @include width(100%, "customize");
    @include position(relative);
    text-align: center;
    color: $defaultColor;

    :deep(a) {

        color: $defaultColor;
    }

    .image-text-bg {
        @include position(absolute, 0, 0, 0, 0);
        @include height(100%, "customize");
        @include width(100%, "customize");
        z-index: -1;
    }

    .image-text-title {
        @include font(30);
        @include padding(120, 0, 0, 0);
    }

    .image-text-description {
        @include font(18);
        @include margin(36, 0);
    }

    .image-text-link-text {
        @include height(50);
        @include width(200);
        line-height: getUnit(50);
        display: inline-block;
        @include border(solid, #ccc, 1)
    }
}
</style>