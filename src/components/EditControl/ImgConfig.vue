<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Img'" title="图片配置" name="5">
            <div class="form_box">
                <div class="form_box_item">
                    <span>图片地址：</span>
                    <el-input v-model="currentTemplateData.url"></el-input>
                </div>
            </div>
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
