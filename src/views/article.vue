<template>
    <div class="article">
        <div class="container-article">
            <div class="article-main">
                <div class="article-content">
                    <h1 class="article-title">{{ articleTitle }}</h1>
                    <div class="article-description">
                        <span class="article-tips time">2024-11-02</span>
                        <span class="article-tips look">
                            22
                        </span>
                    </div>
                    <div class="article-area">

                    </div>
                </div>
                <div class="article-page">
                    <div class="page-prev">
                        <span class="prev">上一页</span>
                        <a-link href="" class="prev-link">查看下一页内容文本查看下一页内容文本查看下一页内容文本查看下一页内容文本</a-link>
                    </div>
                    <div class="page-next">
                        <span class="next">下一页</span>
                        <a-link href="" class="next-link">查看上一页内容文本</a-link>
                    </div>
                </div>
            </div>
            <div class="article-right">
                <dl class="hot-list">
                    <dt class="hot-title">
                        最热文章
                    </dt>
                    <dd class="hot-item">
                        <a-link href="" class="hot-link">
                            最热文章第一名
                        </a-link>
                    </dd>
                    <dd class="hot-item">
                        <a-link href="" class="hot-link">
                            最热文章第一名
                        </a-link>
                    </dd>
                    <dd class="hot-item">
                        <a-link href="" class="hot-link">
                            最热文章第一名
                        </a-link>
                    </dd>
                    <dd class="hot-item">
                        <a-link href="" class="hot-link">
                            最热文章第一名
                        </a-link>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from "vue";
    const articleTitle = ref("内容标题")

</script>
<style lang="scss" scoped>
    @import "@/scss/class.scss";
    @import "@/scss/theme.scss";
    .article{
        background-color: $articleBg;
        @include padding(1, 0)
    }
    .hot-title{
        font-weight: bold;
        @include font(16);
        @include padding(0, 0, 10, 0);
        @include margin(0,0,5,0);
        @include border(solid, $borderColor, 0, 0, 1, 0)
    }
    .container-article{
        @include width($mainWidth);
        @include margin(15, auto);
        display: flex;
    }
    .hot-item{
        @include font(14);
        @include padding(3, 5);
    }
    .article-title{
        @include font(18);
        text-align: center;
    }
    .article-right{
        @include width(300);
        @include margin(0,0,0,10)
    }
    .article-page{

    }
    .page-prev,
    .page-next{
        display: flex;
        @include font(14);
        @include width(50%, "customize");
    }
    .next-link,
    .prev-link{
        vertical-align: text-bottom;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        flex: 1;
        @include padding(0, 10);
    }
    .article-page,
    .article-right,
    .article-content{
        background-color: $articleMainBg;
        box-sizing: border-box;
        @include padding(10);
        @include borderRadius(5);
    }
    .article-main{
        flex: 1;
    }
    .article-tips{
        @include font(12);
        user-select: none;
        color: $articleTipsColor;
    }
    .article-page{
        display: flex;
        @include margin(15,auto,auto,auto);
        .next,
        .prev{
            @include font(12);
            @include padding(2, 5);
            @include borderRadius(2);
            @include width(50);
            text-align: center;
            box-sizing: border-box;
            user-select: none;
            background-color: $articleBg;
            color: $articlePageTipsColor;
        }
    }
</style>