<template>
    <div class="product-container">
        <div class="products-3d product-list">
            <div class="product-item" v-for="(item, idx) in JSON.parse(decodeURIComponent($t('vueProducts.list')))">
                <div class="product-transform">
                    <div class="product-transform-back">
                        <h5 class="product-title">
                            {{ item.title }}
                        </h5>
                        <a-link :href="item.link">
                            {{ item.text }}
                        </a-link>
                    </div>
                    <div class="product-transform-front">
                        <cp-image width="100%" height="100%" :src="item.image" :alt="item.alt"></cp-image>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination-box">
            <pagination @currentChange="currentChange"></pagination>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import pagination from "@/components/pagination/index.vue";
import { useI18n } from "vue-i18n";
import cpImage from "@/components/images/index.vue"
const t = useI18n();

const currentChange = (index) => {
    console.log("index 当前页面变化事件", index)
}

const goArticle = () => {

}
onMounted(() => {
})
</script>
<style lang="scss" scoped="scoped">
    @use "@/scss/class" as *;
    @use "@/scss/theme" as *;
    .pagination-box{
        text-align: center
    }
    .product-container {
        @include padding(15, 0);
        background-color: $aboutBg;
    }
    .products-3d {
        @include width($mainWidth);
        @include margin(0, auto);
        @include threeEnv();
        background-color: $aboutMainBg;
    }
    .product-list {
        @include gridShow();
        @include padding(10);
    }
    .product-item {
        @include position(relative);
        @include boxSize(border-box);
        @include overflow();
        @include borderRadius(3);
        @include textAlign();
        .product-transform {
            @include height(calc(100%), "customize");
            @include width(calc(100%), "customize");
            @include position(absolute);
            @include transition(transform 0.3s ease);
            @include transform(rotateY(0),center center);
            @include threeEnv();
        }
        .product-transform-front {
            @include position(absolute);
            @include height(calc(100%), "customize");
            @include width(calc(100%), "customize");
            @include transform(translateZ(0px),center center);
            background-color: $producesBlockBg;
        }
        .product-transform-back {
            @include position(absolute);
            @include height(calc(100%), "customize");
            @include width(calc(100%), "customize");
            @include transform(translateZ(-0.1px) rotateY(-180deg),center center);
            @include font(12);
            @include padding(5);
            background-color: $producesBlockBg;
            box-sizing: border-box;
        }
        &:hover > .product-transform {
            @include transform(rotateY(180deg),center center);
        }
    }
    .product-title{
        @include font(14);
    }
    
    @media screen and (max-width: 1024px) {
        .products-3d{
            @include width(calc(100%), "customize");
            box-sizing: border-box
        }
        .product-list{
            grid-template-columns: auto auto
        }
    }
</style>
