<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Breadcrumb'" title="内容配置" name="5">
            <div class="form_box">
                     <div class="form_box_item" v-for="(item,index) in currentTemplateData.children" :key="index">
                    <span>标签name</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="item.breadName">
                    </el-input>
                    <el-button type="danger" icon="el-icon-delete" @click="deltab(index)"></el-button>
                </div>
                    
            </div>
            <div class="text-center">
                  <el-button type="primary" @click="addtab">添加标签项</el-button>
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
        methods:{
            deltab(index){
                if(this.currentTemplateData.children.length>1){
                    this.currentTemplateData.children.splice(index,1);
                }
                
            },
            addtab(){
                this.currentTemplateData.children.push(  {breadName:'首页',url:''})
            },
        },
    }
</script>

<style lang="less" scoped>

</style>
