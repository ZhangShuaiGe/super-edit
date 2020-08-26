<template>
  <i
    :class="currentTemplateDate.className"
    :style="{
      color: currentTemplateDate.color,
      fontSize: currentTemplateDate.fontSize + 'px',
      ...styleObject,
    }"
    :draggable="isEdit"
    @drag.stop="drag($event)"
    @dragstart.stop="dragStart($event,currentTemplateDate)"
    @click.stop="showEdit"
  ></i>
</template>

<script>
export default {
  props: ["currentTemplateDate", "templateName", "styleObject"]
};
</script>

<style lang="less" scoped></style>
