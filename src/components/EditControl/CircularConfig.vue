<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Circular'" title="圆形框配置" name="10">
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
