<template>
    <div>
        <div
            :draggable="isEdit"
            @drag.stop="drag($event)"
            @dragstart.stop="dragStart($event,currentTemplateDate)"
            @click.stop="showEdit"
            :style="{...styleObject}"
        >
            {{currentTemplateDate.text}}
        </div>
    </div>
</template>

<script>
    import store from '@/store/store';

    export default {
        data() {
            return {}
        },
        props: ["currentTemplateDate", "templateName", "styleObject"],
    }
</script>

<style lang="less" scoped>
</style>
