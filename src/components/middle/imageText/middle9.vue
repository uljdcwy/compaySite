<template>
    <div class="image-text">
        <div class="image-text-box">
            <div class="image-text-box-title">全场景充电服务</div>
            <div class="image-text-box-description">遍布全国的补能网络，贴心的自营充电服务，让鹏友没有里程焦虑</div>
            <div class="image-text-list">
                <div class="image-text-list-left image-text-item">
                    <img class="image-text-list-left-img" :src="threeList" alt="">
                    <div class="image-text-text">
                        <div class="image-text-text-title">
                            自营充电网络
                        </div>
                        <div class="image-text-text-description">
                            1000+站点，覆盖全国所有地级行政区和直辖市；S4液冷超快充，最快充电5分钟，续航增加200km+
                        </div>
                    </div>
                </div>
                <div class="image-text-list-right">
                    <div class="image-text-item">
                        <img class="image-text-item-img" :src="threeList" alt="">
                        <div class="image-text-text">
                            <div class="image-text-text-title">
                                自营充电网络
                            </div>
                            <div class="image-text-text-description">
                                1000+站点，覆盖全国所有地级行政区和直辖市；S4液冷超快充，最快充电5分钟，续航增加200km+
                            </div>
                        </div>
                    </div>
                    <div class="image-text-item">
                        <img class="image-text-item-img" :src="threeList" alt="">
                        <div class="image-text-text">
                            <div class="image-text-text-title">
                                自营充电网络
                            </div>
                            <div class="image-text-text-description">
                                1000+站点，覆盖全国所有地级行政区和直辖市；S4液冷超快充，最快充电5分钟，续航增加200km+
                            </div>
                        </div>
                    </div>
                    <div class="image-text-item">
                        <img class="image-text-item-img" :src="threeList" alt="">
                        <div class="image-text-text">
                            <div class="image-text-text-title">
                                自营充电网络
                            </div>
                            <div class="image-text-text-description">
                                1000+站点，覆盖全国所有地级行政区和直辖市；S4液冷超快充，最快充电5分钟，续航增加200km+
                            </div>
                        </div>
                    </div>
                    <div class="image-text-item">
                        <img class="image-text-item-img" :src="threeList" alt="">
                        <div class="image-text-text">
                            <div class="image-text-text-title">
                                自营充电网络
                            </div>
                            <div class="image-text-text-description">
                                1000+站点，覆盖全国所有地级行政区和直辖市；S4液冷超快充，最快充电5分钟，续航增加200km+
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a-link class="image-text-link" href="">了解充电服务 ></a-link>
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
    @include padding(205, 0, 120, 0);
    background-color: #fefefe;
    .image-text-list {
        color: $defaultColor;
        display: flex;
        justify-content: space-between;

        img {
            @include position(absolute, 0, 0, 0, 0);
            @include width(100%, "customize");
            @include height(100%, "customize");
            z-index: 0;
        }
    }

    .image-text-list-left {
        @include width(380);
        @include height(600);
    }

    .image-text-list-right {
        display: flex;
        flex: 1;
        @include padding(0, 0, 0, 20);
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: stretch; /* 垂直方向默认拉伸 */
        gap: getUnit(25);
        .image-text-item {
            flex: 1;
            min-width: getUnit(45%, "customize");
            @include height(280);
        }
    }

    .image-text-box {
        @include width($mainWidth);
        @include margin(15, auto);
    }

    .image-text-box-title {
        @include font(32);
        text-align: center;
        @include margin(0, 0, 15, 0);
    }

    .image-text-box-description {
        @include font(16);
        text-align: center;
        @include margin(0, 0, 54, 0);
    }

    .image-text-text {
        @include position(absolute, auto, 0, 22, 0);
        z-index: 10;
        box-sizing: border-box;
        @include padding(0, 32);
    }

    .image-text-text-description {
        @include font(12);
        line-height: 1.5;
        display: none
    }

    .image-text-item {
        @include position(relative);
        height: auto;

        &:hover {
            .image-text-text-description {
                display: block
            }
        }
    }

    .image-text-link {
        display: block;
        @include border(solid, #ccc, 1);
        @include width(194);
        @include height(42);
        @include margin(60, auto, auto);
        text-align: center;
        line-height: getUnit(42);
    }

    .image-text-text-title {
        @include font(16);
        @include margin(0, 0, 10, 0);
    }
}
</style>