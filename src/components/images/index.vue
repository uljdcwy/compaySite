<template>
    <img :src="props.imgSrc" :alt="props.imgAlt" :width="props.width" :height="props.height" :class="props.class" :style="props.style">
    </img>
</template>
<script setup>
    const props = defineProps(['imgSrc', 'imgAlt', 'width', 'height',"class","style"]);
</script>
<style lang="scss" scoped="scoped">
</style>
