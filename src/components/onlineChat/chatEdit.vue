<template>
    <div class="chat-write" @click="focusEl">
        <div :class="selectStatus ? 'select-text' : ''" class="chat-write-content">
            <div @input="changeWrite($event)" @keydown="recordKey" @keyup="recordUp" type="hide" ref="writeInput"
                class="input-box" :class="focusStatus ? 'active' : ''" contenteditable="true"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const focusStatus = ref(false);
const writeInput = ref();

/**
 * @type {any}
 */
let recordKeyVal = [];
let selectStatus = ref(false);


let writeStatus = "";
let writePrev = "";
let writeCurrent = "";
let prevNow = 0;
let isZhReg = /[\u4e00-\u9fa5]/;
let tempStr = "";

const changeWrite = (/** @type {any} */ e) => {
    let inputEl = writeInput.value;
    let isBackspace = recordKeyVal[0] == "Backspace";
    // 此时输入由输入法控制
    if (writeStatus == "Process") {
        writePrev = writeCurrent;
        // 匹配正则
        let currentData = e.data && e.data.replace(/'/g, '') || "";
        let regExpPrev = new RegExp("^" + (writePrev || "") + ".*");
        let regExpCurr = new RegExp("^" + currentData + ".*");
        let isReduce = regExpCurr.test(writePrev);
        // 普通的添加
        let isAdd = regExpPrev.test(currentData);
        let isZh = isZhReg.test(currentData);
        let isLow = /[a-z]+/;
        isReduce = isBackspace && isReduce;
        // 输入多个中英混输
        if ((currentData && currentData.length > 1) && isZhReg.test(currentData) && isLow.test(currentData)) {
            isAdd = true;
        };
        // 使用正则匹配前一个值如果能配如果匹配成功与输入的是小写字母说明在键入中
        if (isAdd && isLow.test(currentData) || isReduce || (isZh && isAdd)) {
            prevNow = 0;
            if (isAdd && isLow.test(currentData)) {
                for (let i = 0; i < writeCurrent.length; i++) {
                    deleteText(inputEl);
                }

                for (let i = 0; i < currentData.length; i++) {
                    writeText(inputEl, currentData[i]);
                }
            } else if (isReduce) {
                deleteText(inputEl);
            }

            writeCurrent = currentData;
            if ((writePrev == currentData || !currentData) && isBackspace) {
                writeCurrent = "";
            };
            // 如果有汉字产生 说明输入完成
        } else if (isZh) {
            prevNow = 0;
            for (let i = 0; i < writeCurrent.length; i++) {
                deleteText(inputEl);
            }
            for (let i = 0; i < (e.data && e.data.length); i++) {
                writeText(inputEl, e.data[i]);
            }
            writeCurrent = "";
            // 自定义输入中
        } else {
            let defVal = Date.now() - prevNow;
            // 有时键会自动键入两个以时间区分
            if (defVal > 10) {
                writeText(inputEl, e.data);
            }
             // mousePosition
            prevNow = Date.now();
            writeCurrent = "";
        }
        // 此时输入法由键盘控制直接写入内容
    } else {
        prevNow = 0;
        if (isBackspace) {
            deleteText(inputEl);
        } else {
            if(!e.data){
                return ;
            }
            writeText(inputEl, e.data);
        }
    }
}


const recordKey = (/** @type {any} */ e) => {
    let code = e.code || e.keyCode;
    if (recordKeyVal.indexOf(code) < 0) recordKeyVal.push(code);
    writeStatus = e.key;
    if (recordKeyVal.length == 1) {
        moveInput(recordKeyVal[0]);
    }
    if (focusStatus.value && recordKeyVal.indexOf("ControlLeft") > -1 && recordKeyVal.indexOf("KeyA") > -1 && recordKeyVal.indexOf("ControlLeft") < recordKeyVal.indexOf("KeyA")) {
        selectEvent();
    };
};


const pasteData = (/** @type {any} */ event) => {

    // @ts-ignore
    let clipboardData = event && event.clipboardData || window.clipboardData;
    let textData = clipboardData.getData('text');
    let inputEl = writeInput.value;
    for (let i = 0; i < textData.length; i++) {
        writeText(inputEl, textData[i]);
    }
}

const selectEvent = () => {
    selectStatus.value = true;
}

const copyData = (event) => {
    copyRun(event);
}

const copyRun = (event) => {
    event.preventDefault();
    let inputEl = writeInput.value;
    // 创建一个新的Range对象，用于选择文本
    let range = document.createRange();
    range.selectNode(inputEl);
    let childNodes = inputEl.parentNode.childNodes;
    let copyStr = "";
    childNodes.forEach((el) => {
        if(/br/i.test(el.nodeName)){
            copyStr += "\n";
        }else if(el != inputEl){
            copyStr += el.innerText;
        }
    });
    console.log(copyStr,"copyStr")
    // @ts-ignore
    window.getSelection().removeAllRanges(); // 清除之前的选择
    event.clipboardData.setData('text/plain', copyStr);
    // @ts-ignore
    window.getSelection().addRange(range); // 将新的Range对象添加到选择中
    document.execCommand('copy'); // 执行复制命令
}

const cutData = function (/** @type {any} */ e) {
    copyRun();
    cleanInput();
    writeInput.value.innerText = "";
    writeInput.value.focus();
}

const cleanInput = () => {
    let inputEl = writeInput.value;
    while (inputEl) {
        let nextEl = inputEl.nextElementSibling;
        let prevEl = inputEl.previousElementSibling;
        if (nextEl) {
            inputEl.parentNode.removeChild(nextEl);
        } else if (prevEl) {
            inputEl.parentNode.removeChild(prevEl);
        } else {
            inputEl = null;
        }
    }
}

const recordUp = (/** @type {any} */ e) => {
    
    if(writeStatus == "Process" && recordKeyVal[0] == "Backspace" && writeCurrent.length == 1){
        console.log("触发删除")
        deleteText(writeInput.value);
        writeCurrent = "";
    };

    if(e.key == "Enter"){
        let inputEl = writeInput.value;
        writeBr(inputEl);
        updateInputVal();
    }
    recordKeyVal.pop();
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
            if (upEl) {
                inputEl.parentNode?.insertBefore(inputEl, upEl);
            } else {
                inputEl.parentNode?.insertBefore(inputEl, inputEl.parentNode.firstChild);
            }
            writeInput.value.focus();
            break;
        case "ArrowDown":
            let downEl = findPositionEl(inputEl.offsetLeft, getTop(inputEl, "Down"), inputEl, "Down")
            if (downEl) {
                inputEl.parentNode?.insertBefore(inputEl, downEl);
            } else {
                inputEl.parentNode?.appendChild(inputEl);
            }
            writeInput.value.focus();
            break;
        case "ArrowRight":
            if (inputEl.nextElementSibling && inputEl.nextElementSibling.nextElementSibling) {
                let targetEl = inputEl.nextElementSibling.nextElementSibling;
                inputEl.parentNode?.insertBefore(inputEl, targetEl);
            } else {
                inputEl.parentNode?.appendChild(inputEl);
            }
            writeInput.value.focus();
            break;
        case "ArrowLeft":
            if (inputEl.previousElementSibling) {
                let targetEl = inputEl.previousElementSibling;
                inputEl.parentNode?.insertBefore(inputEl, targetEl);
            } else {
                inputEl.parentNode?.insertBefore(inputEl, inputEl.parentNode.firstChild);
            };
            writeInput.value.focus();
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
    };

    clearTimeout(timer);
    timer = setTimeout(() => {
        updateInputVal();
    }, 100);
}
/**
 * @type { any }
 */
let timer = null;
const writeBr = (el) => {
    let insertEl = document.createElement("br");
    el.parentNode?.insertBefore(insertEl, el);
}
/**
 * 
 * @param {HTMLElement} position 
 * @param {string} data 
 */
const writeText = (position, data) => {
    let el = document.createElement("span");
    if (data == ' ') {
        el.innerHTML = "&nbsp;";
    } else if(data == "\n"){
        writeBr(position);
    } else {
        el.innerText = data;
    }
    el.className = "text-span";
    el.onclick = replaceWrite;
    position.parentNode?.insertBefore(el, position);
    clearTimeout(timer);
    timer = setTimeout(() => {
        updateInputVal();
    }, 100);
}
// 更新输入光标内容为输入里的内容
const updateInputVal = () => {
    let inputEl = writeInput.value;
    let childNodesList = inputEl.parentNode.childNodes;
    /**
     * @type {string[]}
     */
    let textContext = [];
    childNodesList.forEach((/** @type {any} */ el, /** @type {any} */ idx) => {
        console.log(el,"el")
        if (el != inputEl) {
            textContext.push(el.innerText);
        }
    });
    let text = textContext.join("");
    let textLen = text.length;
    // 输入错误
    if (text != inputEl.innerText) {
        console.log("输入错误");
    }

    inputEl.innerHTML = text;
    if (writeInput.value.firstChild) {
        moveCursor(writeInput.value.firstChild, textLen);
    }
}

const moveCursor = (el, index) => {
    /**
     * @type {any}
     */
    let selection = window.getSelection();
    // 创建一个 Range 对象
    let range = document.createRange();

    // 设置 Range 对象的起始位置（这里设置在第 3 个字符之后）
    range.setStart(el, index); // 2 是起始位置，表示第 3 个字符

    // 折叠 Range 对象，将光标放在起始位置
    range.collapse(true);

    // 将 Range 对象添加到 Selection 对象中
    selection.removeAllRanges();
    selection.addRange(range);
}

const replaceWrite = function (e) {
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
    if (writeInput.value.firstChild) {
        moveCursor(writeInput.value.firstChild, writeInput.value.innerText.length);
    }
    selectStatus.value = false;
    focusStatus.value = true;
};

const hideBlur = () => {
    let inputEl = writeInput.value;
    inputEl.removeEventListener("paste", pasteData);
    inputEl.removeEventListener("copy", copyData);
    inputEl.removeEventListener("cut", cutData);
    selectStatus.value = false;
    focusStatus.value = false;

    if(mousePosition == "inner"){
        for (let i = 0; i < writeCurrent.length; i++) {
            deleteText(inputEl);
        }
        writeCurrent = "";
    }
}

let mousePosition = "inner";

const removeEventListLeave = (e) => {
    mousePosition = "outer"
}

const removeEventListEnter = (e) => {
    mousePosition = "inner"
}



const winBlur = () => {
}

const focusEl = () => {
    writeInput.value.parentNode.appendChild(writeInput.value);
    writeInput.value.focus();
}

onMounted(() => {
    writeInput.value.addEventListener("focus", hideFocus);
    writeInput.value.addEventListener("blur", hideBlur);
    window.addEventListener("blur", winBlur);
    window.document.addEventListener("mouseenter", removeEventListEnter);
    window.document.addEventListener("mouseleave", removeEventListLeave);
});

onUnmounted(() => {
    writeInput.value.blur();
    writeInput.value.removeEventListener("focus", hideFocus);
    writeInput.value.removeEventListener("blur", hideBlur);
    window.removeEventListener("blur", winBlur);
    window.document.removeEventListener("mouseenter", removeEventListEnter);
    window.document.removeEventListener("mouseleave", removeEventListLeave);
});

const inputHeight =  ref("16px")

</script>
<style lang="scss" scoped>
@use "@/scss/class" as *;
@use "@/scss/theme" as *;

:deep(.text-span) {
    display: inline-block;
    user-select: none;
}

.chat-write {
    @include height(160);
    cursor: text;
    background-color: #f00;
    box-sizing: border-box;
    @include padding(10, 0);
    overflow: hidden;
    word-break: break-word;

    :deep(.select-text) {
        .text-span {
            user-select: none;
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
            animation: flashing 1s infinite;
        }

        .input-box {
            text-wrap: nowrap;
            user-select: none;
            overflow: hidden;
            color: transparent;
            opacity: 0;
            background-color: #000;
            height: v-bind(inputHeight);
            @include width(2);
            @include margin(0, -1);
            outline: none;
            border: none;
            @include padding(0);
            overflow: hidden;
            background-color: #000;
            display: inline-block;
            vertical-align: bottom;
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