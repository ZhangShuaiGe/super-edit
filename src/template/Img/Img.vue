<template>
  <div>
    <img
      :src="currentTemplateDate.url"
      alt=""
      :draggable="isEdit"
      @drag.stop="drag($event)"
      @dragstart.stop="dragStart($event,currentTemplateDate)"
      @click.stop="showEdit"
      :style="{...styleObject}"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["currentTemplateDate", "templateName", "styleObject"],
};
</script>

<style lang="less" scoped></style>
