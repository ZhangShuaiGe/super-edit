<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'ColorBlock'" title="背景框配置" name="4">
            <el-color-picker v-model="currentTemplateData.background"></el-color-picker>
        </el-collapse-item>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from "vuex";
    export default {
        data () {
            return {

            }
        },
        computed:{
            ...mapState([
                "currentTemplateData",
                "currentModule",
            ]),
            moduleflag(){
                return this.currentModule?this.currentModule.split("_")[0]:null;
            },
        },
    }
</script>

<style lang="less" scoped>

</style>
