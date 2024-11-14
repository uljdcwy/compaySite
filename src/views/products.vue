<template>
    <div class="product-container">
        <div class="products-3d product-list">
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        这是反面
                    </div>
                    <div class="product-transform-front">
                        这是正面
                    </div>
                </div>
            </div>
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        这是反面
                    </div>
                    <div class="product-transform-front">
                        这是正面
                    </div>
                </div>
            </div>
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        这是反面
                    </div>
                    <div class="product-transform-front">
                        这是正面
                    </div>
                </div>
            </div>
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        这是反面
                    </div>
                    <div class="product-transform-front">
                        这是正面
                    </div>
                </div>
            </div>
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        这是反面
                    </div>
                    <div class="product-transform-front">
                        这是正面
                    </div>
                </div>
            </div>
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        这是反面
                    </div>
                    <div class="product-transform-front">
                        这是正面
                    </div>
                </div>
            </div>
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        <a-link href="/article">
                            这是反面
                        </a-link>
                    </div>
                    <div class="product-transform-front">
                        <a-link href="/article">
                            这是正面
                        </a-link>
                    </div>
                </div>
            </div>
            <div class="product-item">
                <div class="product-transform">
                    <div class="product-transform-back">
                        这是反面
                    </div>
                    <div class="product-transform-front">
                        这是正面
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination-box">
            <pagination></pagination>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import pagination from "@/components/pagination/index.vue";

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
    }
    .products-3d {
        @include width($mainWidth);
        @include margin(0, auto);
        @include threeEnv();
    }
    .product-list {
        @include gridShow();
        @include background(#000);
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
            @include background(#f00);
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
            @include background(#0f0);
        }
        .product-transform-back {
            @include position(absolute);
            @include height(calc(100%), "customize");
            @include width(calc(100%), "customize");
            @include transform(translateZ(-0.1px) rotateY(-180deg),center center);
            @include background(#00f);
        }
        &:hover > .product-transform {
            @include transform(rotateY(180deg),center center);
        }
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
