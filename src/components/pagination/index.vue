<template>
    <div class="pagination">
        <div class="pagination-container">
            <ul class="pagination-list">
                <template v-for="(item, idx) in paginationList" :key="idx">
                    <li class="pagination-item" @click="changePage(item)" v-pagination-class="item" :class="currentPage == item ? 'pagination-active' : ''">
                        {{ item }}
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getPagination } from "@/utils/utils.js";

const paginationList = ref([]);
const currentPage = ref(0);

const vPaginationClass = {
  beforeMount: (el,props) => {
    // 在元素上做些操作
    if(typeof props.value == 'string') {
        el.classList.add('pagination-ellipsis');
    }
  },
  updated (el, props){
    // 在元素上做些操作
    if(typeof props.value == 'string') {
        el.classList.add('pagination-ellipsis');
    }else{
        el.classList.remove('pagination-ellipsis');
    }
  }
};

const changePage = (item) => {
    if(typeof item == "number" && item != currentPage.value){
        currentPage.value = item;
        paginationList.value = getPagination(currentPage.value,10);
    }
}

onMounted(() => {
    currentPage.value = Math.ceil(Math.random() * 10);
    paginationList.value = getPagination(currentPage.value,10);
    // document.documentElement.style.setProperty('--border-color', '#f00');
})
</script>
<style lang="scss" scoped>
    @import "@/scss/class.scss";
    @import "@/scss/theme.scss";
    .pagination-container{
        @include width($mainWidth);
        @include margin(0, auto);
    }
    .pagination-list{
        display: flex;
        @include padding(10, 0);
        .pagination-item{
            @include border(solid, $borderColor, 1);
            @include padding(3, 8);
            @include borderRadius(2);
            @include font(14);
            color: $linkColor;
            cursor: pointer;
            @include margin(0, 5);
            user-select: none;
        }
        .pagination-diabled{
            cursor: no-drop;
            color: $diabledColor !important;
            border-color: $diabledColor !important;
        }
        .pagination-active{
            cursor: auto;
        }
        .pagination-ellipsis{
            color: $linkColor !important;
            font-weight: bolder;
            cursor: auto;
            border-color: transparent !important;
        }
        .pagination-active,
        .pagination-item:hover{
            color: $hoverColor;
            border-color: $hoverColor;
        }
    }
</style>