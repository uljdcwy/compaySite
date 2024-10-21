<template>
    <div id="toolbar"></div>
    <button class="bold-text" @click="boldSelects">加粗文本</button>
    <button class="bold-text" @click="unblodSelects">解除加粗</button>
    <button class="bold-text" @click="underlineSelects">添加下划线</button>
    <button class="bold-text" @click="unUnderlineSelects">解除下划线</button>
    <button class="bold-text" @click="italicsSelects">添加斜体</button>
    <button class="bold-text" @click="unItalicsSelects">解除斜体</button>
    <div id="editMain" contenteditable="true" @keydown="clearOtherBr" @keyup="getEditorJson" style="height: 120px;background-color: #f00;padding: 10px">
    </div>
</template>

<script setup>
import { effect, onMounted, onUnmounted } from 'vue';
import { getDomJson, patch, getSelectContent, bold, patchDragEnter, italics, underline, resetSelectPosition, initRichContent, winGetSelection, removeChild } from "./editor.js";
/** @type { any } */
let editMain;
let agentStart = false;
let dragStatus = false;
/**
 * @type {any[]}
 */
let astDom;
/**@type {*} */
const selectAst = [];
const getEditorJson = (/** @type {any} */ e) => {
  console.log(e.keyCode,"e.keyCode", e)
  if (e.ctrlKey && e.keyCode == "65" || e.ctrlKey && e.keyCode == "86" || !e.ctrlKey && e.keyCode == "17") {
    return;
  }
  if (agentStart && e.keyCode != 32) return;
  setTimeout(() => {
    let selectDom = winGetSelection();
    if(moveBrStatus && selectDom.anchorNode.parentNode.nextSibling) {
      console.log(selectDom.anchorNode.parentNode.nextSibling,"selectDom.anchorNode.parentNode.nextSibling")
      removeChild(selectDom.anchorNode.parentNode.nextSibling);
    }
    patch({
      oldVdom: astDom,
      newVdom: getDomJson(editMain)
    });
    moveBrStatus = false;
    console.log(astDom,"astDom")
  })
};

let moveBrStatus = false;

const clearOtherBr = () => {
  let selectDom = winGetSelection();
  if(selectDom.anchorNode != selectDom.focusNode) {
    moveBrStatus = true;
  }
  console.log(selectDom.anchorNode,"winGetSelection",selectDom.focusNode)
}

const boldSelects = () => {
    selectAndUpdate(bold, selectAst);
};
const unblodSelects = () => {
    selectAndUpdate(bold, selectAst, true);
}

const underlineSelects = () => {
    selectAndUpdate(underline, selectAst);
}

const unUnderlineSelects = () => {
    selectAndUpdate(underline, selectAst, true);
 }

const italicsSelects = () => {
  selectAndUpdate(italics, selectAst);
}

const unItalicsSelects = () => {
    selectAndUpdate(italics, selectAst, true);
}

const selectAndUpdate = (cb, selectAst, status) => {
    selectAst.push(...getSelectContent(astDom, selectAst));
    if (!selectAst[0]) return;
    cb && cb(selectAst, status);
    resetSelectPosition(selectAst);
}

const startAgentFn = () => {
    agentStart = true;
};

const endAgentFn = () => {
  agentStart = false;
};

let selected = false;

const mousedown = (/** @type {any} */ e) => {
  editMain.addEventListener("mousemove", mousemove);
  if (e.shiftKey) {
    selected = true;
  };
};

/**
 * 
 * @param {*} e 
 */
const mouseup = (e) => {
  editMain.removeEventListener("mousemove", mousemove);
  if (dragStatus || !selected) {
    return;
  };
  // selectAst.push(...getSelectContent(astDom, selectAst));
  selected = false;
  return false;
};

/**
 * 
 * @param {*} event 
 */
const paste = (event) => {
  event.preventDefault();
  // @ts-ignore
  let paste = (event.clipboardData || window.clipboardData).getData("text");

    if (paste && typeof paste == "string") {
        updateEnter(paste);
   } else {
     let file = getImage(event);
   }
   return false;
}


const mousemove = (/** @type {any} */ e) => {
  selected = true;
};

/**
 * 
 * @param {*} e 
 */
const dragend = (event) => {
    let dragText = event.dataTransfer.getData("text/plain");
    dragStatus = false;
    event.preventDefault();

    // 清除选择内容
    // resetSelectPosition(selectAst);
    console.log(selectAst,"selectAst")
    
    // 

    updateEnter(dragText);
    return false;
}


 const updateEnter = (contentText) => {
    patchDragEnter(astDom, contentText);
    console.log(astDom,"astDom")
}

const dragenter = (event) => {
    dragStatus = true;
}

const dragleave = () => {
  dragStatus = false;
}

const copy = (e) => {
  e.preventDefault();
  const selectAst = getSelectContent(astDom, []);

  let clipboardText = "";

  if(selectAst.length > 1) {
    let leafIdxFirst = selectAst[0].position;
    let leafIdxLast = selectAst[selectAst.length - 1].position;
    let dir = "";
    console.log(leafIdxFirst, "leafIdxFirst", leafIdxLast, "leafIdxLast")
    if (leafIdxFirst[1] > leafIdxLast[1] || (leafIdxFirst[1] == leafIdxLast[1] && leafIdxFirst[2] > leafIdxLast[2])) {
      dir = "up";
    } else {
      dir = "down";
    }
    console.log(dir,"dir")
    selectAst.forEach((elem, idx) => {

    })

  } else {
    clipboardText = selectAst[0].children[0].children;
  };

  console.log(e, "e copy", selectAst);
};

const cut = (e) => {
  e.preventDefault();
  console.log(e, "e cut")
}

const setClipboard = (text) => {

}



onMounted(() => {
  editMain = document.getElementById("editMain");
  astDom = getDomJson(editMain);
  initRichContent(astDom)

  editMain.addEventListener("dragenter", dragenter);
  editMain.addEventListener("drop", dragend);
  editMain.addEventListener("dragleave", dragleave);

  editMain.addEventListener("paste", paste);
  editMain.addEventListener("copy", copy);
  editMain.addEventListener("cut", cut);

  editMain.addEventListener("mousedown", mousedown);
  window.addEventListener("mouseup", mouseup);

  editMain.addEventListener("compositionstart", startAgentFn);
  editMain.addEventListener("compositionend", endAgentFn);
});

onUnmounted(() => {
  editMain.removeEventListener("compositionstart", startAgentFn);
  editMain.removeEventListener("compositionend", endAgentFn);

  editMain.removeEventListener("paste", paste);
  editMain.removeEventListener("copy", copy);
  editMain.removeEventListener("cut", cut);

  editMain.removeEventListener("dragenter", dragenter);
  editMain.removeEventListener("drop", dragend);
  editMain.removeEventListener("dragleave", dragleave);

  window.removeEventListener("mouseup", mouseup);
  editMain.removeEventListener("mousedown", mousedown);
});

</script>

<style lang="scss" scoped>
#edit-main,
#toolbar {
  width: 100%;
}

#edit-main {
  min-height: 30px;
}
p{
  margin-bottom: 15px
}
#editMain {
  min-height: 160px;
  overflow-y: scroll;
}
</style>
