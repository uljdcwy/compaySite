<template>
    <vue-header @search="searchContent"></vue-header>
    <router-view></router-view>
    <vue-footer @search="searchContent" :bg="bg"></vue-footer>
</template>
<script setup>
// @ts-ignore
import bg from "@public/bg.jpg";
import { isClient } from "@/utils/utils";
import vueFooter from "@/components/footer/index.vue"
import vueHeader from "@/components/header/index.vue";
import richContent from "@/components/richContent/index.vue";
import { useI18n } from "vue-i18n";
import bigDataScreen from "@/components/big-data-screen/index.vue";
import { nextTick } from "vue";
import { onMounted, ref } from "vue";
import { router } from "./router";
const t = useI18n();

const searchValue = ref();



onMounted(() => {
})

const searchContent = (/** @type {any} */ val) => {
    console.log(val,"val");
    searchValue.value = val;
}
</script>

<style lang="scss" scoped="scoped"></style>
