<template>
    <div class="online-chat">
        <div v-show="!chatStatus" @mouseup.left="maxChat" class="online-tip">我的消息 <div class="message-count has-message">99+
            </div>
        </div>
        <div v-show="chatStatus" class="online-content">
            <div class="chat-head">
                <div class="chat-title">
                    <img src="@public/chat.png" class="chat-logo" alt="">
                    <i class="chat-name">聊天室</i>
                </div>

                <div class="chat-opera">
                    <div class="icon-item" @mouseenter="hoverAudio" @mouseleave="hoverAudio" @click="taggleAudio">
                        <span v-show="!audio" class="iconfont icon-yangshi_icon_tongyong_audio"></span>
                        <span v-show="audio" class="iconfont icon-yangshi_icon_tongyong_audio_mute"></span>
                    </div>
                    <div class="icon-item">
                        <span class="iconfont icon-xialaxuanze-" @click="minChat"></span>
                    </div>
                    <div class="icon-item">
                        <span class="iconfont icon-guanbi"></span>
                    </div>

                </div>
            </div>

            <div class="chat-content">
                <div class="chat-main">
                    <div class="chat-info">

                    </div>
                    <chat-edit></chat-edit>
                </div>
                <div class="chat-aside">
                    <div class="adv-img">
                        <img src="@public/person.jpg" alt="">
                    </div>
                    <div class="person-img">
                        <img src="@public/person.jpg" alt="">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import chatEdit from "./chatEdit.vue"


onMounted(() => {
});

onUnmounted(() => {
})



const chatStatus = ref(true);

const audio = ref(false);

const maxChat = () => {
    chatStatus.value = true;
}

let clickAduio = false;

const hoverAudio = () => {
    audio.value = clickAduio ? audio.value : !audio.value;
    clickAduio = false;
}

const taggleAudio = () => {
    clickAduio = true;
}

const minChat = () => {
    chatStatus.value = false;
}

const closeChat = () => {

}

const openChat = () => {

}

</script>
<style lang="scss" scoped>
@use "@/scss/class" as *;
@use "@/scss/theme" as *;

:deep(.text-span) {
    display: inline-block;
}

.online-chat {
    @include position(fixed, auto, 10, 10, auto);
    z-index: 999;
    @include border(solid, #ccc, 1);
    @include borderRadius(2);

    .online-tip {
        @include padding(5);
        cursor: pointer;
        @include font(14);
    }

    .message-count {
        display: inline-block;
        font-weight: bold;
        @include font(12);
        color: $redColor;
        @include position(relative, -6, -2, auto, auto)
    }
}

.has-message {}

.chat-opera {
    color: $chatHeadColor;
    display: flex;

    .iconfont {
        @include font(22);
        @include margin(0, 5);
        cursor: pointer;
    }
}

.online-content {
    @include padding(2);
    @include width($chatWidth);
    @include borderRadius(5);
    @include boxShadow(#ccc, 0, 0, 2, 0);

    .chat-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include padding(2, 4);
        background-color: $chatHeadBG;

        .chat-logo {
            vertical-align: middle;
            @include height(40)
        }

        .chat-name {
            font-style: normal;
            color: $chatHeadColor;
            @include margin(0, 0, 0, 6);
            @include font(12);
            font-weight: bold;
        }
    }
}

.chat-content {
    display: flex;
    @include height(500);

    .chat-main {
        flex: 1;
        display: flex;
        flex-direction: column;

        .chat-info {
            flex: 1;
        }
    }

    .chat-write {
        @include height(160);
        cursor: text;
        background-color: #f00;
        box-sizing: border-box;
        @include padding(10, 0);
        overflow: hidden;
        word-break: break-word;

        .chat-write-content {
            @include position(relative, 0, 0, 0, 0);
            @include padding(0, 10);
            overflow-y: scroll;
            width: calc(100% + 18px);
            box-sizing: border-box;
            max-height: 100%;

            .active {
                content: "";
                user-select: none;
                @include width(2);
                outline: none;
                overflow: hidden;
                border: none;
                @include padding(0);
                background-color: #000;
                display: inline-block;
                animation: flashing 1s infinite;
                vertical-align: bottom;
            }
        }
    }

    .chat-aside {
        display: flex;
        flex-direction: column;
        @include width(160);
        @include border(solid, #ccc, 0, 0, 0, 1);

        .adv-img {
            flex: 1;
        }

        .person-img {
            @include padding(0, 20);
            @include height(160);
            @include margin(auto, auto);
        }

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}

@keyframes flashing {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}</style>