<template>
    <router-view v-slot="{ Component, route }">
      <transition name="bounce" mode="out-in">
        <keep-alive :exclude="props.exclude" :max="props.max || 10">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
</template>
<script setup>
  const props = defineProps(["exclude", "max"]);
</script>

<style lang="scss" scoped="scoped">
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
