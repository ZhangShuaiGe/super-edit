<template>
    <div>
        <el-collapse-item title="页面属性配置" name="2">
            <div class="form_box">
                <div class="form_box_item">
                    <span>标题：</span>
                    <el-input v-model="templateData.page.title"></el-input>
                </div>
                <div class="form_box_item">
                    <span>页面宽度：</span>
                    <el-input v-model="templateData.page.width"></el-input>
                </div>
                <div class="form_box_item">
                    <span>页面高度：</span>
                    <el-input v-model="templateData.page.height"></el-input>
                </div>
                <div class="form_box_item">
                    <span>背景色设置：</span>
                    <el-color-picker v-model="templateData.page.background"></el-color-picker>
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
                "templateData",
            ]),
        },
    }
</script>

<style lang="less" scoped>

</style>
