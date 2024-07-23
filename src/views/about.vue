<template>
    <div class="about">
        <div class="container-about">
            <div class="about-welcome">{{ $t("vueAbout.mainblock.welcomeDescribe") }}</div>
            <div class="main-block">
                <h1 class="about-title">{{ $t("vueAbout.mainblock.title") }}</h1>
                <div class="concat-block">
                    <div class="text-concat">
                        {{ $t('vueAbout.mainblock.mainInfo') }}
                    </div>
                    <div class="img-concat">
                        <img class="concat-qr" :src="$t('vueAbout.mainblock.QRCode1')">
                        <div class="qr-text">{{ $t('vueAbout.mainblock.QRCode1Tip') }}</div>
                        <img class="concat-qr" :src="$t('vueAbout.mainblock.QRCode2')">
                        <div class="qr-text">{{ $t('vueAbout.mainblock.QRCode2Tip') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const router = useRouter();
const route = useRoute();
const t = useI18n();
</script>
<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";

.container-about {
    @include width($mainWidth);
    @include margin(15, auto);
}
    
.about-title {
    @include padding(20, 0);
    font-weight: 500;
    @include border(solid, $borderColor, 0, 0, 1, 0);
}

.main-block {
    @include padding(40);
    background-color: $aboutMainBg;
}

.about-welcome {
    @include font(14);
    @include margin(0, 0, 10, 5);
}

.concat-block {
    display: flex;
}

.qr-text {
    @include font(16);
    text-align: center;
    @include margin(0, 0, 20, 0)
}

.concat-qr {
    width: 100%;
    @include margin(0, 0, 10, 0)
}

.text-concat {
    flex: 1;
    box-sizing: border-box;
    @include padding(30);
}

.img-concat {
    @include width(160);
    box-sizing: border-box;
    @include padding(10);
}

.about {
    @include padding(30, 0);
    background-color: $aboutBg;
}

@media screen and (max-width: 1024px) {
    .container-about {
        @include width(auto);
        @include margin(5, 10);
    }

    .about {
        @include padding(15, 0);
    }

    .main-block {
        @include padding(20);
    }

    .about-title {
        @include padding(10, 0);
    }

    .concat-block {
        display: block;
    }

    .img-concat {
        @include width(auto);
    }

    .concat-qr {
        @include width(160);
        @include margin(0, auto);
        display: block;
    }

    .text-concat {
        @include padding(10);
    }
}
</style>
  