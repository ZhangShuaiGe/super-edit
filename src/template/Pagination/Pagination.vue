<template>
    <div
        :style="{...styleObject}"
        :draggable="isEdit"
        @drag.stop="drag($event)"
        @dragstart.stop="dragStart($event,currentTemplateDate)"
        @click.stop="showEdit"
    >
        <el-pagination
            :background="currentTemplateDate.type=='true'?true:false"
            layout="prev, pager, next"
            :total="1000"
            :pager-count="currentTemplateDate.pagercount||5"
            :hide-on-single-page="currentTemplateDate.hide=='true'?true:false"
        ></el-pagination>
    </div>
</template>

<script>
import store from "@/store/store";
export default {
    props: ["currentTemplateDate", "templateName", "styleObject"]
};
</script>

<style lang="less" scoped></style>
