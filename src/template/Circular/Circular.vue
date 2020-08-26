<template>
    <div
        class="Circular—box"
        :draggable="isEdit"
        @drag.stop="drag($event)"
        @dragstart.stop="dragStart($event,currentTemplateDate)"
        @click.stop="showEdit"
        :style="{...styleObject}"
    >
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props:["currentTemplateDate","templateName","styleObject"],
    }
</script>

<style lang="less" scoped>
    .Circular—box{
        border-radius: 50%;
    }
</style>
