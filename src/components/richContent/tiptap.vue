<template>
  <div class="edit-rich">
    <div class="tool-bar">
      <span class="tool-span font">
        <input readonly type="text" v-model="currentFont" class="readonly-font-family">
        <ul class="family-list">
          <li class="family-item" v-for="(item, idx) in fontFamilyList" @click="setFontFamily(item.value)">
            {{ item.value }}
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
  const selectFontStaus = ref(false);

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
    // 获取光标位置的所有样式
    const textStyleAttributes = editor.getAttributes('textStyle');
    if(textStyleAttributes.fontFamily){
      // console.log('光标位置的所有样式:', textStyleAttributes);
      // 字体更新
      currentFont.value = textStyleAttributes.fontFamily;
    }else if(currentFont.value != "none"){
      // 字体更新
      currentFont.value = "none";
    }
    // // 获取当前的字体状态
    // editor.isActive('textStyle', { fontFamily: editor.getAttributes('textStyle').fontFamily });
  }
  

  onMounted(() => {
  })

  const setFontFamily = (str) => {
    console.log(str,"str")
    if(str == "none"){
      editor.value.chain().focus().unsetFontFamily().run();
    }else{
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
  .readonly-font-family{
    @include padding(0, 5, 0, 0);
    @include maxWidth(calc(100% - getUnit(10)), 'customize');
    @include height(calc(getUnit($editToolHeight) - getUnit(10)), 'customize');
    @include border(solid, transparent, 0);
    outline: none;
    background: transparent;
    cursor: pointer;
    vertical-align: text-bottom;
    box-sizing: border-box;
  }
  .tool-span.font:hover .readonly-font-family{
  }
  .tool-span.font::after{
    @include border(solid, transparent, 5);
    @include position(absolute, auto, 5, 4, auto);
    display: block;
    content: "";
    height: 0;
    width: 0;
    border-top-color: $borderColor;
  }
  .tool-span.font::before{
    @include border(solid, transparent, 5);
    @include position(absolute, 4, 5, auto, auto);
    display: block;
    content: "";
    height: 0;
    width: 0;
    border-bottom-color: $borderColor;
  }
  .family-list{
    display: none;
    @include font(12);
    @include position(absolute, $editToolHeight, 0, auto, auto);
    @include boxShadow(#ccc, 0, 0, 5, 1);
    background-color: $editToolBgColor;
    z-index: 100;

  }
  .tool-span.font{
    @include width($editToolWidth * 3);
    @include padding(0, 5);
    position: relative;
    &:hover{
      .family-list{
        display: block;
      }
    }
  }
  .tool-span.is-active{
    background-color: $editToolActiveBgColor;
    .icon{
      color: $editToolActiveFontColor
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