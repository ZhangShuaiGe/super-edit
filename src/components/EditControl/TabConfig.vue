<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'TabsContainer'" title="Tab设置" name="3">
            <div class="form_box">
                <div class="form_box_item" v-for="(item,index) in currentTemplateData.children" :key="index">
                    <span>标签name</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="item.tabName">
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
    import { v4 as uuid } from 'uuid';
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
          addtab(){
            this.currentTemplateData.children.push( {
            tabName:'标签name',
            name:`tab-${uuid()}`,
            children:[

            ]
        })
          },
          deltab(index){
              if(this.currentTemplateData.children[index].children.length>0){
                  this.$message('请先删除tab中内容');
                  return ;
              }
              if(this.currentTemplateData.children.length>1){
                  this.currentTemplateData.children.splice(index,1);
              }
            
          }
        }
    }
</script>

<style lang="less" scoped>
.text-center{
  text-align: center;
}
</style>
