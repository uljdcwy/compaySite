<template>
    <div class="context-block">
        <div class="main-context">
            <div class="context-text">
                <h3 class="vice-title">{{ $t('vueIndex.imageTextBlock.vice') }}</h3>
                <h2 class="main-title">{{ $t('vueIndex.imageTextBlock.title') }}</h2>
                <span class="title-line"></span>
                <div class="title-describe">
                    {{ $t('vueIndex.imageTextBlock.describe') }}
                </div>
                <a :href="$t('vueIndex.imageTextBlock.detailsUrl')" class="look-details">{{ $t('vueIndex.imageTextBlock.detailsTip') }}</a>
            </div>
            <div class="context-image">
                <img :src="$t('vueIndex.imageTextBlock.imgUrl')" :alt="$t('vueIndex.imageTextBlock.imgAlt')">
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const t = useI18n();

</script>

<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";

.context-block {
    background-image: v-bind(t('vueIndex.imageTextBlock.bgUrl'));
    max-width: 100%;
    overflow: hidden;
    @include margin(20, 0);
    @include padding(25, 0);
}


.main-context {
    display: flex;
    background-color:#f00;
    justify-content: space-between;
    background-color: $defaultBGColor;
    box-sizing: border-box;
    .context-text {
        flex: 1;

        .vice-title {
            @include font(30);
            color: $lightColor;
        }

        .title-describe {
            @include font(14);
            @include padding(10, 0)
        }

        .title-line {
            display: block;
            @include width(40);
            @include height(4);
            background-color: $redColor;
        }

        .main-title {
            @include padding(10, 0, 20);
            @include font(42);
        }

        .look-details {
            @include font(14);
            color: $linkColor;
            text-decoration-line: none;

            &:hover {
                color: $hoverColor;
            }
        }

    }

    .context-image {
        width: 50%;

        img {
            max-width: 100%;
        }
    }

    @include width($mainWidth);
    @include margin(20, 1e15);
    @include padding(20)
}

@media screen and (max-width: 1024px) {
    .context-block {
        @include margin(10, 0);
        @include padding(10, 0);
    }


    .main-context {
        width: 100%;
        display: block;
        @include margin(10);
        .context-text {
            @include padding(10, 0);
            @include margin(10);
        }

        .context-image {
            width: 100%;
        }
        width: auto;
        @include padding(0);
    }
}
</style>
