<template>

  <div 
    :style="{...styleObject}"
    :draggable="isEdit"
    @drag.stop="drag($event)"
    @dragstart.stop="dragStart($event,currentTemplateDate)"
    @click.stop="showEdit">
  <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->

      <el-breadcrumb-item v-for="(it,index) in currentTemplateDate.children" :key="index">
        {{it.breadName}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  
</template>

<script>
export default {
  props: ["currentTemplateDate", "templateName", "styleObject"]
};
</script>

<style lang="less" scoped></style>
