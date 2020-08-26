<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Form'" title="表单配置" name="6">
            <div class="form_box">
                <div class="form_box_item">
                    <span>表单地址：</span>
                    <el-input v-model="currentTemplateData.url"></el-input>
                </div>
                <div v-for="(item,index) in currentTemplateData.children" :key='index'>
                    <div v-if="!item.isHide">
                        <div class="form_box_item" v-if="item.elementType!='button'">
                            <span>label</span>
                            <el-input v-model="item.label"></el-input>
                        </div>
                        <div class="form_box_item" v-if="item.elementType!='button'">
                            <span>必填</span>
                            <el-switch
                                    v-model="item.config.required"
                                    active-text="是"
                                    inactive-text="否">
                            </el-switch>
                        </div>
                        <div class="form_box_item" v-if="item.elementType=='input'">
                            <span>正则验证</span>
                            <el-input v-model="item.config.regexp"></el-input>
                        </div>
                    </div>
                    
                    
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
                form:{

                }
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
