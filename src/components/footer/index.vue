<template>
    <footer class="footer">
        <div class="footer-content">
            <ul class="nav-footer-list">
                <li class="nav-footer-item" v-for="(item, index) in JSON.parse(decodeURIComponent($t('vueFooter.navList')))">
                    <a-link  :query="item.query" :params="item.params" class="item-link" :href="item.link">{{item.title}}</a-link>
                </li>
                <li class="nav-footer-item">
                    {{ $t('vueFooter.navTips') }}
                </li>
            </ul>
            <div class="footer-main-block">
                <div class="logo-block">
                    <img class="footer-logo" :src="$t('vueFooter.logoUrl')"
                        :alt="$t('vueFooter.logoAlt')">
                    <div class="other">
                        <a-link href="" class="iconfont out-link icon-weixin"></a-link>
                        <a-link href="" class="iconfont out-link icon-weibo"></a-link>
                    </div>
                </div>
                <div class="search-block">
                    <div class="search-tips">
                        {{ $t('vueFooter.telTips') }}
                    </div>
                    <div class="concat-tel">
                        {{ $t('vueFooter.tel') }}
                    </div>
                    <div class="search-box">
                        <i class="search-icon iconfont icon-sousuo"></i>
                        <input v-model="inputVal" class="input-el" :placeholder="$t('vueFooter.searchPlaceholder')" />
                        <button class="search-btn" @click="goSerach">{{$t('vueFooter.searchText')}}</button>
                    </div>
                </div>
            </div>
            <div class="footer-info" v-html="$t('vueFooter.Filing')">
            </div>
        </div>
        <div class="phone">
            <div class="tabs-list">
                <div class="tab-item">
                    <a-link :href="$t('vueFooter.homeLink')">
                        <i class="iconfont icon-shouyefill"></i>
                        {{ $t('vueFooter.homeText') }}
                    </a-link>
                </div>
                <div class="tab-item">
                    <a :href="'tel:' + $t('vueFooter.tel')">
                        <i class="iconfont icon-tianchongxing-"></i>
                        {{ $t('vueFooter.telText') }}
                    </a>
                </div>
                <div class="tab-item" @click="goTop">
                        <i class="iconfont icon-zhiding"></i>
                        {{ $t('vueFooter.goTopText') }}
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps(['bg']);
const emits = defineEmits(['search']);
const goTop = () => {
    scrollTo(0,0);
}


/**
 * 数据格式
 * propsData
{
    Filing: `©2022 xxxxxxxx有限公司 版权所有 备案号：粤ICP备xxxxxx号 技术支持：<a href="javascript:;">曾细亚</a>`,
   telTips: "24小时服务热线",
   tel: "0755-23446330",
   logoUrl: logo,
   navTips: "致力于打造人工智能智慧生活",
   homeLink: "",
   logoAlt: "提示alt",
   navList: [
        {
            title: "首页",
            link: ""
        },
        {
            title: "产品中心",
            link: ""
        },
        {
            title: "解决方案",
            link: ""
        },
        {
            title: "工程案例",
            link: ""
        },
        {
            title: "品牌介绍",
            link: ""
        },
        {
            title: "新闻资讯",
            link: ""
        }
    ],
    footerBg: 'url("https://static.styles-sys.com/comdata/82487/202202/2022022514230713badd.jpg")'
}
 * 
 */
let footerBg = `url(${props.bg})`;
const inputVal = ref();
const goSerach = () => {
    emits('search', inputVal.value)
};

const t = useI18n();

onMounted(() => {
})
</script>
<style lang="scss" scoped="scoped">
@import "@/scss/class.scss";
@import "@/scss/theme.scss";
.phone{
    display: none;
}
.footer {
    color: $defaultColor;
    background-color: $defaultBGColor;
    background-image: v-bind(footerBg);
    background-size: auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-Attachment: fixed;
    background-size: cover;
}

.footer-content {
    width: getUnit($mainWidth);
    @include margin(0, auto);

    .item-link {
    }

    .nav-footer-list {
        @include padding(10, 0);
        @include border(solid, $borderColor, 0, 0, 1, 0);

        .nav-footer-item {
            @include padding(12, 20);
            @include font(14);
            display: inline-block
        }

        .nav-footer-item:last-child {
            float: right;
        }
    }

    .footer-main-block {
        display: flex;
        justify-content: space-between;
        @include padding(40, 0);

        .footer-logo {
            @include height(80)
        }

        .other {
            @include padding(15, 0, 0);
        }

        .out-link {
            @include margin(0, 10);
            @include font(26);
        }

        .search-tips {
            @include font(12);
            @include padding(0, 0, 5, 0)
        }

        .concat-tel {
            @include font(22);
            @include padding(0, 0, 10, 0);
            color: $mainBtnColor
        }

        .search-box {
            display: flex;
            @include border(solid, $borderColor, 1);
            position: relative
        }

        .input-el {
            @include padding(15, 30);
            outline: none;
            border: none;
            @include width(260);
            @include font(12)
        }

        .search-btn {
            border: none;
            outline: none;
            @include padding(0, 15);
            background-color: $mainBtnColor;
            color: $defaultColor;
            cursor: pointer;
        }

        .search-icon {
            display: flex;
            align-items: center;
            @include position(absolute, 0, 0, 0, 0);
            @include padding(0, 6);
            color: $borderColor;
            @include width(20);
        }
    }

    .footer-info {
        @include font(14);
        text-align: center;
        @include padding(15, 0, 25);
    }

    :deep(a) {
        color: $defaultColor;

        &:hover {
            color: $hoverColor
        }
    }
}


@media screen and (max-width: 1024px) {
    .nav-footer-list{
        display: none;
    }
    .footer-content{
        max-width: 100%;
        .footer-main-block{
            display: block;
            @include padding(15, 0, 10)
        }
        .concat-tel,
        .search-tips,
        .other{
            display: none
        }
        .footer-logo{
            @include margin(0, auto);
            display: block
        }
        .search-box{
            @include margin(25, 20, 5)
        }
        .search-btn{
            @include width(80);
        }
        .input-el{
            flex: 1;
            @include width(270);
        }
    }
    .phone{
        display: block;
        @include padding(30, 0);
    }
    .tabs-list{
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        @include height(60);
        background-color: $phoneFixedBg;
        @include padding(10 , 0, 0, 0);
        @include border(solid, $borderColor, 1, 0, 0, 0);
        box-sizing: border-box;
        .tab-item{
            flex: 1;
            @include font(14);
            text-align: center;
            color: $phoneFixedColor;
            font-weight: bold;
        }
        .iconfont{
            display: block;
            text-align: center;
            @include font(24);
            @include margin(0,0,3,0);
        }
    }
}
</style>
