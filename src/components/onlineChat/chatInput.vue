<template>
    <div class="chat-write" @click="focusEl">
        <div :class="selectStatus ? 'select-text' : ''" class="chat-write-content">
            <input @input="changeWrite($event)" @keydown="recordKey" @keyup="recordUp" type="hide" ref="writeInput"
                class="active">
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const focusStatus = ref(false);
const writeInput = ref();
let delLen = 1;

/**
 * @type {any}
 */
let recordKeyVal = [];
let selectStatus = ref(false);

const recordKey = (/** @type {any} */ e) => {
    let code = e.code || e.keyCode;
    console.log(code,"code")
    if (recordKeyVal.indexOf(code) < 0) recordKeyVal.push(code);
    if (recordKeyVal.length == 1) {
        moveInput(recordKeyVal[0]);
    }
    console.log(recordKeyVal,"recordKeyVal",focusStatus.value, recordKeyVal[0] == "ControlLeft", recordKeyVal[1] == "KeyA")
    if(focusStatus.value && recordKeyVal[0] == "ControlLeft" && recordKeyVal[1] == "KeyA"){
        selectEvent();
    }
};

const pasteData = (/** @type {any} */ event) => {

    console.log("粘帖数据")
    // @ts-ignore
    let clipboardData = event.clipboardData || window.clipboardData;
    let textData = clipboardData.getData('text');
    let inputEl = writeInput.value;
    for (let i = 0; i < textData.length; i++) {
        writeText(inputEl, textData[i]);
    }
}

const selectEvent = () => {
    selectStatus.value = true;
}

const copyData = () => {
    console.log("考贝数据")
    copyRun();
}

const copyRun = () => {
    // 创建一个新的Range对象，用于选择文本
    var range = document.createRange();
    range.selectNode(writeInput.value);
    // @ts-ignore
    window.getSelection().removeAllRanges(); // 清除之前的选择
    // @ts-ignore
    window.getSelection().addRange(range); // 将新的Range对象添加到选择中
    document.execCommand('copy'); // 执行复制命令
}

const cutData = function(/** @type {any} */ e) {
    console.log("剪切数据", e)
    copyRun();
    cleanInput();
    writeInput.value.value = "";
}

const cleanInput = () => {
    let inputEl = writeInput.value;
    while(inputEl){
        let nextEl = inputEl.nextElementSibling;
        let prevEl = inputEl.previousElementSibling;
        if(nextEl){
            inputEl.parentNode.removeChild(nextEl);
        }else if(prevEl){
            inputEl.parentNode.removeChild(prevEl);
        }else{
            inputEl = null;
        }
    }
}

const recordUp = (/** @type {any} */ e) => {
    recordKeyVal.pop()
}
/**
 * 
 * @param {string} d 
 */
const moveInput = (d) => {
    let inputEl = writeInput.value;
    switch (d) {
        case "ArrowUp":
            let upEl = findPositionEl(inputEl.offsetLeft, getTop(inputEl, "Up"), inputEl, "Up")
            if (upEl && !selectStatus.value) {
                inputEl.parentNode?.insertBefore(inputEl, upEl);
            } else {
                inputEl.parentNode?.insertBefore(inputEl, inputEl.parentNode.firstChild);
            }
            writeInput.value.focus();
            selectStatus.value = false;
            break;
        case "ArrowDown":
            let downEl = findPositionEl(inputEl.offsetLeft, getTop(inputEl, "Down"), inputEl, "Down")
            if (downEl && !selectStatus.value) {
                inputEl.parentNode?.insertBefore(inputEl, downEl);
            } else {
                inputEl.parentNode?.appendChild(inputEl);
            }
            writeInput.value.focus();
            selectStatus.value = false;
            break;
        case "ArrowRight":
            if (inputEl.nextElementSibling && inputEl.nextElementSibling.nextElementSibling && !selectStatus.value) {
                let targetEl = inputEl.nextElementSibling.nextElementSibling;
                inputEl.parentNode?.insertBefore(inputEl, targetEl);
            } else {
                inputEl.parentNode?.appendChild(inputEl);
            }
            writeInput.value.focus();
            selectStatus.value = false;
            break;
        case "ArrowLeft":
            if (inputEl.previousElementSibling && !selectStatus.value) {
                let targetEl = inputEl.previousElementSibling;
                inputEl.parentNode?.insertBefore(inputEl, targetEl);
                return;
            }else{
                inputEl.parentNode?.insertBefore(inputEl, inputEl.parentNode.firstChild);
            };
            writeInput.value.focus();
            selectStatus.value = false;
            break;
        default:
            break;
    }
}

/**
 * 
 * @param {number} left
 * @param {number} inputTop 
 * @param {HTMLElement} el 
 * @param {string} Dir
 */
const findPositionEl = (left, inputTop, el, Dir) => {
    let currentEl = Dir == "Down" ? el.nextElementSibling : el.previousElementSibling;
    // previousElementSibling;
    // nextElementSibling
    while (currentEl) {
        // @ts-ignore
        let difT;
        // @ts-ignore
        let difL = currentEl.offsetLeft - left;
        if (Dir == "Down") {
            // @ts-ignore
            difT = currentEl.offsetTop - inputTop;
            currentEl = currentEl.nextElementSibling;
        } else {
            // @ts-ignore
            difT = currentEl.offsetTop - inputTop;
            currentEl = currentEl.previousElementSibling;
        };
        if (Math.abs(difT) < 6 && Math.abs(difL) < 6) {
            return currentEl;
            break;
        };
    };
    return null;
}

/**
 * 
 * @param {HTMLElement} el 
 * @param {string} Dir 
 * @returns {number}
 */
const getTop = (el, Dir) => {
    let top;
    let height;
    if (el.previousElementSibling) {
        // @ts-ignore
        height = el.previousElementSibling.offsetHeight;
    } else if (el.nextElementSibling) {
        // @ts-ignore
        height = el.nextElementSibling.offsetHeight;
    } else {
        height = el.offsetHeight;
    }
    if (Dir == "Down") {
        top = (el.offsetTop + height);
    } else {
        top = (el.offsetTop - height);
    }
    return top;
}

const changeWrite = (/** @type {any} */ e) => {
    let writeData = e.data;
    let len = writeData && writeData.length;
    let inputEl = writeInput.value;
    let keyCode = recordKeyVal[0];

    console.log(e,"e")


    if (keyCode == "Backspace") {
        deleteText(inputEl);
    } else if (len > 1 || (keyCode == "Space" && writeData != ' ')) {
        // delLen += 1;
        for (let i = 0; i < delLen; i++) {
            deleteText(inputEl);
        }
        for (let i = 0; i < len; i++) {
            writeText(inputEl, writeData[i]);
        }
        if (keyCode == "Space" && writeData != ' ') {
            delLen = 1;
            return;
        };
        delLen = len;
    } else {
        writeText(inputEl, writeData);
    }

    if ((keyCode != "Space" && delLen > len)) {
        delLen = 1;
    }

    let inputContextLength = inputEl.value.length;
    let inputElLength = inputEl.parentNode.childNodes.length - 1;
    if ((inputElLength - inputContextLength) >= 1) {
        deleteText(inputEl);
    }
}

const deleteText = (/** @type {HTMLElement} */ el) => {
    /**
     * @type {any}
     */
    let removeEl = el.previousSibling;
    while (removeEl) {
        if (removeEl.nodeType != 1) {
            removeEl = removeEl.previousSibling;
        } else {
            removeEl.parentNode.removeChild(removeEl);
            removeEl = null;
        }
    }
}
/**
 * @type { any }
 */
let timer = null;
/**
 * 
 * @param {HTMLElement} position 
 * @param {string} data 
 */
const writeText = (position, data) => {
    let el = document.createElement("span");
    if (data == ' ') {
        el.innerHTML = "&nbsp;";
    } else {
        el.innerText = data;
    }
    el.className = "text-span";
    el.onclick = replaceWrite;
    position.parentNode?.insertBefore(el, position);
    clearTimeout(timer);
    timer = setTimeout(() => {
        updateInputVal();
    },50)
}

const updateInputVal = () => {
    let inputEl = writeInput.value;
    let childNodesList = inputEl.parentNode.childNodes;
    /**
     * @type {string[]}
     */
    let textContext = [];
    childNodesList.forEach((/** @type {any} */ el, /** @type {any} */ idx) => {
        textContext.push(el.innerText)
    })
    console.log(childNodesList[0].innerText,"childNodesList",textContext.join(""))
}

const replaceWrite = /**
* @this {any}
*/function (/** @type {any} */ e) {
        /**
         * @type {any}
         */
        let that = this;
        setTimeout(() => {
            that.parentNode?.insertBefore(writeInput.value, that.nextSibling);
            writeInput.value.focus();
        })
    }

const hideFocus = () => {
    writeInput.value.addEventListener("paste", pasteData);
    writeInput.value.addEventListener("copy", copyData);
    writeInput.value.addEventListener("cut", cutData);
    writeInput.value.addEventListener("select", selectEvent);
    
    focusStatus.value = true;
};

const hideBlur = () => {
    writeInput.value.removeEventListener("paste", pasteData);
    writeInput.value.removeEventListener("copy", copyData);
    writeInput.value.removeEventListener("cut", cutData);
    writeInput.value.removeEventListener("select", selectEvent);
    focusStatus.value = false;
}

const focusEl = () => {
    writeInput.value.parentNode.appendChild(writeInput.value);
    writeInput.value.focus();
}

onMounted(() => {
    writeInput.value.addEventListener("focus", hideFocus);
    writeInput.value.addEventListener("blur", hideBlur);
});

onUnmounted(() => {
    writeInput.value.blur();
    writeInput.value.removeEventListener("focus", hideFocus);
    writeInput.value.removeEventListener("blur", hideBlur);
})

</script>
<style lang="scss" scoped>
@use "@/scss/class" as *;
@use "@/scss/theme" as *;

:deep(.text-span) {
    display: inline-block;
}

.chat-write {
    @include height(160);
    cursor: text;
    background-color: #f00;
    box-sizing: border-box;
    @include padding(10, 0);
    overflow: hidden;
    word-break: break-word;
    :deep(.select-text){
        .text-span{
            background-color: $chatSelectBG;
            color: $chatSelectColor
        }
    }
    .chat-write-content {
        @include position(relative, 0, 0, 0, 0);
        @include padding(0, 10);
        overflow-y: scroll;
        width: calc(100% + 18px);
        box-sizing: border-box;
        max-height: 100%;

        .active {
            user-select: none;
            @include width(200);
            @include margin(0, -1);
            outline: none;
            overflow: hidden;
            border: none;
            @include padding(0);
            background-color: #000;
            display: inline-block;
            animation: flashing 1s infinite;
            vertical-align: middle;
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
}
</style>