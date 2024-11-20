<template>
  <div class="edit-rich">
    <div class="tool-bar">
      <span class="tool-span font" :class="{'is-active': toolFamily}">
        <input readonly type="text" v-model="currentFont" class="readonly-font-family" @click="selectFontStaus = true" @blur="blurFontSelect">
        <ul class="family-list" v-show="selectFontStaus">
          <li class="family-item" v-for="(item, idx) in fontFamilyList" @click="setFontFamily(item.value)">
            {{ item.value }}
          </li>
        </ul> 
      </span>
      <span class="tool-span title" :class="{'is-active': toolTitle}">
        <input class="read-title" readonly v-model="currentTitle" @click="selectTitleStaus = true" @blur="blurTitleSelect"/>
        <ul class="title-list" v-show="selectTitleStaus">
          <li class="title-item" v-for="(item, idx) in 6" @click="setTitle(idx)">
            H{{ idx + 1 }}
          </li>
        </ul>
      </span>
      <span class="tool-span bold" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor?.isActive('bold') }">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zitijiacu"></use>
        </svg>
      </span>
      <span class="tool-span bold" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor?.isActive('underline') }">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zitixiahuaxian"></use>
        </svg>
      </span>
      <span class="tool-span bold" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor?.isActive('italic') }">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zitixieti"></use>
        </svg>
      </span>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>
  <script setup>
  import { onMounted, ref } from "vue"
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import Underline from '@tiptap/extension-underline'
  import StarterKit from '@tiptap/starter-kit'
  import FontFamily from '@tiptap/extension-font-family'
  import TextStyle from '@tiptap/extension-text-style'

  const currentFont = ref("none");
  const toolFamily = ref(false);
  const selectFontStaus = ref(false);
  const selectTitleStaus = ref(false);
  const toolTitle = ref(false);
  const currentTitle = ref("H1")

  const timeoutFalse = (falseObject) => {
    setTimeout(() => {
      falseObject.value = false;
    }, 200)
  };

  const blurTitleSelect = () => {
    timeoutFalse(selectTitleStaus);
  }

  const blurFontSelect = () => {
    timeoutFalse(selectFontStaus);
  };

  const setTitle = (idx) => {
    const level = (idx + 1);
    currentTitle.value = "H" + level;
    selectTitleStaus.value = false;
    editor.value.chain().focus().setNode('heading', { level: level }).run();
  };

  const fontFamilyList = [
    {
      value: "none"
    },{
      value: "Inter"
    },{
      value: "Comic Sans MS, Comic Sans"
    },{
      value: "serif"
    },{
      value: "monospace"
    },{
      value: "cursive"
    }
  ];
    
  const checkTextStyle = ({ editor }) => {
    const textStyleAttributes = editor.getAttributes('textStyle'); // // 获取光标位置的所有样式
    console.log(textStyleAttributes,"textStyleAttributes",editor)
    let familyFontStatus = false;
    if(textStyleAttributes.fontFamily){
      familyFontStatus = true;
      currentFont.value = textStyleAttributes.fontFamily; // 字体更新
    }else if(typeof currentFont.value == "string" && currentFont.value != "none"){
      currentFont.value = "none"; // 字体更新
    }
    toolFamily.value = familyFontStatus;

    const textHeadingAttributes = editor.getAttributes('heading'); // // 获取光标位置的所有样式
    let toolTitleStatus = false
    if(textHeadingAttributes.level){
      toolTitleStatus = true;
      currentTitle.value = "H" + textHeadingAttributes.level;
    }else if(!textHeadingAttributes.level && currentTitle.value != "H1"){
      currentTitle.value = "H1"
    }
    toolTitle.value = toolTitleStatus;
  }
  onMounted(() => {
  })

  const setFontFamily = (str) => {
    if(str == "none"){
      editor.value.chain().focus().unsetFontFamily().run();
    }else{
      toolFamily.value = true;
      editor.value.chain().focus().setFontFamily(str).run();
    }
    currentFont.value = str;
    selectFontStaus.value = false;
  }

  const editor = useEditor({
    content: '',
    extensions: [StarterKit, Underline, FontFamily, TextStyle],
    onCreate() {
      console.log('编辑器已创建并初始化');
      // 监听内容变化
      editor.value.on('selectionUpdate', checkTextStyle);
    }
  });
</script>
<style lang="scss" scoped>
  @use "@/scss/class" as *;
  @use "@/scss/theme" as *;
  .tool-bar{
    @include border(solid, $borderColor, 0, 0, 1, 0);
  }
  .tool-span{
    @include width($editToolWidth);
    @include height($editToolHeight);
    display: inline-block;
    background-color: $editToolBgColor;
    line-height: getUnit($editToolWidth);
    text-align: center;
    cursor: pointer;
    &:hover{
      background-color: $editToolHoverBgColor;
    }
  }
  .is-active{
    &::after{
      border-top-color: $editToolHoverBgColor !important;
    }
    &::before{
      border-bottom-color: $editToolHoverBgColor !important;
    }
  };
  .read-title{
    outline: none;
    background: transparent;
    cursor: pointer;
  }
  .readonly-font-family,
  .read-title{
    @include padding(0, 0, 0, 5);
    @include border(solid, transparent, 0);
    @include position(absolute, auto, auto, 0, 0);
    @include width(100%, 'customize');
    @include height(100%, 'customize');
    @include font(15);
    outline: none;
    background: transparent;
    cursor: pointer;
    vertical-align: text-bottom;
    box-sizing: border-box;
    font-weight: bold;
  }
  .font .readonly-font-family{
    @include padding(0, 18, 0, 5);
  }
  .title{
    position: relative;
    vertical-align: bottom;
  }
  .title-list{
    @include position(absolute, $editToolHeight, 0, auto, auto);
    @include width(100%, 'customize');
    background-color: $editToolBgColor;
    z-index: 11;
    @include font(12);
  }
  .title-item,
  .family-item{
    &:hover{
      background-color: $editToolHoverBgColor;
    }
  }
  .family-item{
    white-space: nowrap;
    text-align: left;
    @include padding(0, 0, 0, 5);
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tool-span.font::after{
    @include border(solid, transparent, 5);
    @include position(absolute, auto, 5, 2, auto);
    display: block;
    content: "";
    height: 0;
    width: 0;
    border-top-color: $borderColor;
  }
  .tool-span.font::before{
    @include border(solid, transparent, 5);
    @include position(absolute, 5, 5, auto, auto);
    display: block;
    content: "";
    height: 0;
    width: 0;
    border-bottom-color: $borderColor;
  }
  .family-list{
    @include font(12);
    @include position(absolute, $editToolHeight, 0, auto, auto);
    @include boxShadow(#ccc, 0, 0, 5, 1);
    @include width(100%, 'customize');
    background-color: $editToolBgColor;
    z-index: 100;
  }
  .tool-span.font{
    @include width($editToolWidth * 3);
    @include padding(0, 5);
    position: relative;
    vertical-align: bottom;
  }
  .tool-span.is-active{
    background-color: $editToolActiveBgColor;
    .icon{
      color: $editToolActiveFontColor
    }
    input{
      color: $editToolActiveFontColor;
    }
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    color:  $editToolFontColor
  }
</style>