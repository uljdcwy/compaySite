<template>
    <n-config-provider style="height: 100%" :locale="zhCN" :date-locale="dateZhCN">
        <n-layout class="wrap-box">
            <n-layout-header class="header">
                <n-image :src="logo" height="40"></n-image>
                <n-el @click="exitLogin" tag="div" class="exit-btn">
                    <n-icon size="40" :component="Exit" />
                </n-el>
            </n-layout-header>
            <n-layout has-sider class="main-content">
                <n-layout-sider content-style="padding: 10px;border-right: 1px solid #ccc">
                    <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :render-icon="renderMenuIcon" :expand-icon="expandIcon" />
                </n-layout-sider>
                <n-layout>
                    <router-view></router-view>
                </n-layout>
            </n-layout>
        </n-layout>
    </n-config-provider>
</template>
<script setup>
// @ts-ignore
import logo from "@public/logo.png"
import { useI18n } from "vue-i18n";
import { ref, h } from "vue";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon
} from '@vicons/ionicons5'
// @ts-ignore
import { Exit, BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import { zhCN, dateZhCN, NConfigProvider, NButton, NLayoutFooter, NLayout, NLayoutContent, NLayoutHeader, NImage, NEl, NIcon, NLayoutSider, NMenu } from "naive-ui";

const t = useI18n();

// @ts-ignore
const renderMenuIcon = function (option) {
    // 渲染图标占位符以保持缩进
    if (option.key === 'sheep-man') return true
    // 返回 false 值，不再渲染图标及占位符
    if (option.key === 'food') return null
    return h(NIcon, null, { default: () => h(BookmarkOutline) })
};

const menuOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'adminIndex'
                    }
                },
                { default: () => '首页' }
            ),
        key: 'adminIndex',
        icon: renderIcon(HomeIcon)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'adminAbout'
                    }
                },
                { default: () => '关于我们' }
            ),
        key: 'adminAbout',
        icon: renderIcon(HomeIcon)
    }
];

// @ts-ignore
function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const expandIcon = function () {
    return h(NIcon, null, { default: () => h(CaretDownOutline) })
}

const collapsed = ref(false)

const exitLogin = () => {
    window.dialog.warning({
        title: '退出登录',
        content: '点击确认退出登录？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
        },
        onNegativeClick: () => {
        }
    })
}

</script>

<style lang="scss" scoped="scoped">
.header {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc
}

.exit-btn {
    float: right;
    cursor: pointer;
}

.wrap-box {
    height: 100%;

    :deep(.n-layout-scroll-container) {
        display: flex;
        flex-direction: column;
    }
}

.main-content {
    flex: 1;
}
</style>
