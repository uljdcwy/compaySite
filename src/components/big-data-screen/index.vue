<template>
    <div class="big-data-screen">
        <div id="main" style="height: 100%;width: 100%;"></div>
    </div>
</template>
<script setup>
import { isClient } from "@/utils/utils"
import { onMounted } from "vue";
import { initMap } from "./big-screen.js"

let isClientStatus = isClient();

if(isClientStatus){
    onMounted(() => {
        initMap();
        console.log("onMounted", "onMounted")
    })
}

</script>

<style lang="scss" scoped="scoped">
    .big-data-screen{
        height: 100%
    }
</style>
