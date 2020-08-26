<template>
      <div 
        class="fx-404"
        :style="{
          ...styleObject,
        }"
        :draggable="isEdit"
        @drag.stop="drag($event)"
        @dragstart.stop="dragStart($event,currentTemplateDate)"
        @click.stop="showEdit"
        >
         <el-image
            draggable="false"
            :style="{width:currentTemplateDate.imgWidth+'px',height:currentTemplateDate.imgHeight+'px'}"
            :src="currentTemplateDate.url"
            :fit="currentTemplateDate.fit"
          ></el-image>
          <h4 class="descTitle">{{currentTemplateDate.descTitle}}</h4>
          <p class="descContent">{{currentTemplateDate.descContent}}</p>
          <a draggable="false" class="jumpText" :href="currentTemplateDate.href">{{currentTemplateDate.jumpText}}</a>
    </div>
</template>

<script>
export default {
  props: ["currentTemplateDate", "templateName", "styleObject"]
};
</script>

<style lang="less" scoped>
  .fx-404{
    text-align: center;
  }
  .descTitle{
    font-size: 16px;
    line-height: 16px;
    color:#333;
    margin-top:20px;
  }
  .descContent{
    font-size: 14px;
    line-height: 14px;
    color:#666;
    margin-top:16px;
  }
  .jumpText{
    font-size: 14px;
    line-height: 14px;
    color:#f34444;
    margin-top:10px;
  }
</style>
