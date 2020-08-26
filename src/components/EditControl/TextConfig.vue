<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Text'" title="文本设置" name="3">
            <div class="form_box">
                <div class="form_box_item">
                    <span>文本内容：</span>
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="currentTemplateData.text">
                    </el-input>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                <div class="form_box_item">
                    <span>字体颜色：</span>
                    <el-color-picker v-model="currentTemplateData.color"></el-color-picker>
                </div>
                <div class="form_box_item">
                    <span>字体大小：</span>
                    <el-input v-model="currentTemplateData.size"></el-input>
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
