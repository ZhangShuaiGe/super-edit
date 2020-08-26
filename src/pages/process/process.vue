<template>
    <div>
      <div class="process">
        <Proitem :list="conditionList"></Proitem>
        <div><a href="javascript:;" @click="addcondition({proadd:true,index:0})">添加111</a></div>
      </div>
      <el-dialog title="分支类型" :visible.sync="conditionVisible" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="条件类型" >
            <el-radio-group v-model="form.radio">
              <el-radio label="1">条件</el-radio>
            </el-radio-group>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleadd">确 定</el-button>
          </div>
      </el-dialog>
    </div>

</template>

<script>
    import {mapState, mapGetters, mapMutations} from "vuex";
    import Proitem from './proitem.vue';
    import processdata from './template.js';
    import mixprocess from './mixprocess.js';
    export default {
        data() {
            return {
              form:{
                radio:'1'
              }
            };
        },
        components:{
          Proitem
        },
         mixins: [mixprocess],
        computed: {
            ...mapState("process",[
                "conditionList","conditionVisible","thid"
            ]),
        },
        created(){
          // let $condilist=JSON.parse(JSON.stringify(processdata));
          // console.log($condilist)
          // // this.stateChange(['conditionList',[$condilist]])
        },
        methods: {
            ...mapMutations('process',["stateChange"]),
            handleClose(){
              this.stateChange(['conditionVisible',false]);
            },
            handleadd(){
              console.log(this.conditionList);
              let nelist=JSON.parse(JSON.stringify(this.conditionList));
              this.addlist();
              this.handleClose();

            },
            
        },
    };

</script>

<style lang="less" scoped>
  .aside-box{
      width: 200px;
      position: fixed;
        left: 0;
        bottom: 0;
        top:0px;
  border-right: solid 1px #e6e6e6;
  }
 
</style>

<style lang="less">
    .aside-box {
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: @editAsideWidth;
            min-height: 400px;
        }
        .el-menu {
            border-right: 0;
        }
    }
</style>
