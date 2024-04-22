<template>
  <div id="toolbar"></div>
  <button class="bold-text" @click="boldSelects">加粗文本</button>
  <div id="editMain" contenteditable="true" @keyup="getEditorJson" style="height: 120px;background-color: #f00;">
  </div>
</template>

<script setup>
import { effect, onMounted, onUnmounted } from 'vue';
import { getDomJson, patch, getSelectContent, bold, getCurrentMouseElem, formatPaste, clearSelectContent } from "./editor.js";
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
let timerVal = null;
setTimeout(() => {timerVal = true}, 3000)
const getEditorJson = (/** @type {any} */ e) => {
  if (e.ctrlKey && e.keyCode == "65") {
    console.log("粘帖了")
    selectAst.push(...getSelectContent(astDom, selectAst));
  }
  if (agentStart) return;
  setTimeout(() => {
    patch({
      oldVdom: astDom,
      newVdom: getDomJson(editMain)
    });
  })
};

const boldSelects = () => {
  if (!selectAst[0]) {
    selectAst.push(...getSelectContent(astDom, selectAst));
  }
  bold(selectAst);
  patch({
    oldVdom: astDom,
    newVdom: getDomJson(editMain)
  });
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
  console.log(astDom,"astDom")
  selectAst.push(...getSelectContent(astDom, selectAst));
  console.log(selectAst,"selectAst")
  selected = false;
  return false;
};

/**
 * 
 * @param {*} event 
 */
const paste = (event) => {
  updateEnter();
  // event.preventDefault();
  // clearSelectContent(selectAst);
  // // @ts-ignore
  // let paste = (event.clipboardData || window.clipboardData).getData("text");

  // if (paste && typeof paste == "string") {
  //   let textElement = formatPaste(paste, astDom);
  //   astDom = getDomJson(editMain);
  // } else {
  //   let file = getImage(event);
  // }
  // return false;
}


const mousemove = (/** @type {any} */ e) => {
  selected = true;
};

/**
 * 
 * @param {*} e 
 */
const dragend = (e) => {
  dragStatus = false;
  updateEnter();
}


const updateEnter = () => {
  const deepTagArr = getCurrentMouseElem(astDom);
  setTimeout(() => {
    let newAst = getDomJson(editMain);
    // @ts-ignore
    patch({
      oldVdom: astDom,
      newVdom: newAst,
      dragEnter: true,
      deepTagArr: deepTagArr
    });
    astDom = getDomJson(editMain);
  });
}

const dragenter = () => {
  dragStatus = true;
}

const dragleave = () => {
  dragStatus = false;
}



onMounted(() => {
  editMain = document.getElementById("editMain");
  astDom = getDomJson(editMain);

  editMain.addEventListener("dragenter", dragenter);
  editMain.addEventListener("drop", dragend);
  editMain.addEventListener("dragleave", dragleave);


  editMain.addEventListener("paste", paste);

  editMain.addEventListener("mousedown", mousedown);
  window.addEventListener("mouseup", mouseup);

  editMain.addEventListener("compositionstart", startAgentFn);
  editMain.addEventListener("compositionend", endAgentFn);
});

onUnmounted(() => {
  editMain.removeEventListener("compositionstart", startAgentFn);
  editMain.removeEventListener("compositionend", endAgentFn);

  editMain.removeEventListener("paste", paste);

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

#editMain {
  min-height: 160px;
  overflow-y: scroll;
}
</style>
