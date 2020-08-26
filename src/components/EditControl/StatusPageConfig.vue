<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'StatusPage'" title="状态页面设置" name="3">
            <div class="form_box">
                <div class="form_box_item">
                    <span>图片地址：</span>
                    <el-input
                            type="text"
                            placeholder="请输入图片地址"
                            v-model="currentTemplateData.url">
                    </el-input>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                <div class="form_box_item">
                    <span>描述标题：</span>
                    <el-input
                            type="text"
                            placeholder="请输入描述标题"
                            v-model="currentTemplateData.descTitle">
                    </el-input>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                 <div class="form_box_item">
                    <span>描述内容：</span>
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入描述内容"
                            v-model="currentTemplateData.descContent">
                    </el-input>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                 <div class="form_box_item">
                    <span>跳转文本：</span>
                    <el-input
                            type="text"
                            placeholder="请输入跳转文本"
                            v-model="currentTemplateData.jumpText">
                    </el-input>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                <div class="form_box_item">
                    <span>跳转地址：</span>
                    <el-input
                            type="text"
                            placeholder="请输入跳转地址"
                            v-model="currentTemplateData.href">
                    </el-input>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                <div class="form_box_item">
                    <span>图片宽度：</span>
                    <el-input-number
                            placeholder="请输入图片宽度"
                            v-model="currentTemplateData.imgWidth">
                    </el-input-number>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                 <div class="form_box_item">
                    <span>图片高度：</span>
                    <el-input-number
                            type="text"
                            placeholder="请输入图片高度"
                            v-model="currentTemplateData.imgHeight">
                    </el-input-number>
                    <!-- <el-input v-model="form.children"></el-input> -->
                </div>
                <div class="form_box_item">
                    <span>适应容器框类型:</span>
                    <el-select v-model="currentTemplateData.fit" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="form.children"></el-input> -->
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
                options: [{
                        value: 'fill',
                        label: 'fill'
                        }, {
                        value: 'contain',
                        label: 'contain'
                        }, {
                        value: 'cover',
                        label: 'cover'
                        }, {
                        value: 'none',
                        label: 'none'
                        }, {
                        value: 'scale-down',
                        label: 'scale-down'
                        }],
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
