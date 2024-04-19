<template>
    <a class="a-link" @click="goUrl($event)">
        <slot></slot>
    </a>
</template>
<script setup> 
import { goRouter } from "@/utils/utils.js";
import { useRouter } from "vue-router";// @ts-ignore
import { isClient } from "@/utils/utils";
// @ts-ignore
import { useStore } from "vuex";



/**
* @type {(event: any) => void}
*/
let goUrl;
const isClientStatus = isClient();
const props = defineProps(['query', 'params']);
const emit = defineEmits(['success', 'fail'])
const store = useStore();

// 如果是客户端
if(isClientStatus){
    const router = useRouter();

    /**
     * @param {any} event
     */
    goUrl = (event) => {
        store.commit("setPageLoading", true);
        goRouter(event, router, props.query, props.params, (/** @type {any} */ err) => {
            if(err){
                emit('fail', err);
            }else{
                emit('success', '');
            };
            store.commit("setPageLoading", false);
        })
    }
}
</script>