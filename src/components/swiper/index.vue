<template>
    <swiper :modules="modules" :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }" effect="fade" :spaceBetween="30" :navigation="true" :pagination="{
        clickable: true,
    }" :loop="true" @swiper="onSwiper" @slideChange="onSlideChange">
        <template v-for="(item, index) in JSON.parse(decodeURIComponent($t('vueIndex.bannerblock')))">
            <swiper-slide class="swiper-item"><img class="swiper-img" :src="item.imageUrl" :alt="item.alt"></swiper-slide>
        </template>
    </swiper>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { isClient } from "@/utils/utils"
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useI18n } from "vue-i18n";
// @ts-ignore
import { Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules';


const t = useI18n();

const onSlideChange = () => {

}


const onSwiper = (/** @type {any} */ swiper) => {
};

const modules = [EffectFade, Navigation, Pagination, Autoplay];

// @ts-ignore
if (isClient()) {
    onMounted(() => {
    })
}
</script>

<style lang="scss" scoped="scoped">
.swiper-item{
    .swiper-img{
        width: 100%;
        height: auto;
    }
}



@media screen and (max-width: 1024px) {
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev){
        display: none;
    }
}
</style>
