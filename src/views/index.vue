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
    <image-textb></image-textb>
    <image9-text></image9-text>
    <three3-list></three3-list>
    <image10-text></image10-text>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import vueSwiper from "@/components/swiper/index.vue";
import countBlock from "@/components/home/itemCountBlock.vue";
import threeList from "@/components/middle/threeList/middle1.vue";
import three1List from "@/components/middle/threeList/middle2.vue";
import three2List from "@/components/middle/threeList/middle3.vue";
import three3List from "@/components/middle/threeList/middle8.vue";
import imageText from "@/components/middle/imageText/middle5.vue";
import image9Text from "@/components/middle/imageText/middle9.vue";
import image10Text from "@/components/middle/imageText/middle10.vue";
import leftRight from "@/components/middle/leftTextRightImage/middle4.vue";
import imageTextb from "@/components/middle/imageText/middle7.vue";
import imageTexta from "@/components/middle/imageText/middle6.vue";
import imageTextBlock from "@/components/home/itemImageText.vue";

onMounted(() => {
})
</script>
<style lang="scss" scoped="scoped">
  
</style>
  