<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Divider'" title="分割线设置" name="5">
            <div class="form_box">
                <div class="form_box_item">
                    <span>文本：</span>
                    <el-input v-model="currentTemplateData.text"></el-input>
                </div>
                <div class="form_box_item">
                    <span>位置：</span>
                    <el-select v-model="currentTemplateData.position" placeholder="请选择">
                      <el-option label="左"  value="left"></el-option>
                      <el-option label="中"  value="center"></el-option>
                      <el-option label="右"  value="right "></el-option>
                    </el-select>
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
