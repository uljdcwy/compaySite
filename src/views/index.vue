<template>
  <div class="index-container">
    <vue-swiper></vue-swiper>
    <count-block></count-block>
    <three-list></three-list>
    <three1-list></three1-list>
    <three2-list></three2-list>
    <left-right></left-right>
    <image-text></image-text>
    <image-texta></image-texta>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import vueSwiper from "@/components/swiper/index.vue";
import countBlock from "@/components/home/itemCountBlock.vue";
import threeList from "@/components/middle/threeList/middle1.vue";
import three1List from "@/components/middle/threeList/middle2.vue";
import three2List from "@/components/middle/threeList/middle3.vue";
import imageText from "@/components/middle/imageText/middle5.vue";
import leftRight from "@/components/middle/leftTextRightImage/middle4.vue";
import imageTexta from "@/components/middle/imageText/middle6.vue";
import imageTextBlock from "@/components/home/itemImageText.vue";

onMounted(() => {
})
</script>
<style lang="scss" scoped="scoped">
  
</style>
  