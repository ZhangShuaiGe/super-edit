<template>
  <div  :style="{...styleObject}"  :draggable="isEdit"
      @drag.stop="drag($event)"
      @dragstart.stop="dragStart($event,currentTemplateDate)"
      @click.stop="showEdit">
      <el-divider :content-position="currentTemplateDate.position">{{currentTemplateDate.text}}</el-divider>
  </div>  
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["currentTemplateDate", "templateName", "styleObject"],
  created(){
    
  },
  methods:{
    
  },
};
</script>

<style lang="less" scoped>

</style>
