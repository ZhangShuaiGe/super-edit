<template>
    <div  class="pcontainer">
      <div v-for="(item,index) in list" :key="index" style="display: inline-block;">
        <div class="icbottom" v-if="item.ismain&&(index==0)">
          <i class="el-icon-circle-plus-outline" @click="comadd({proadd:true,index:0})"></i>
        </div>
     
      <div class="card" >
        <div class="pcard ">
        条件
        <i class="el-icon-delete" @click="delcondition(item.prand)"></i>
      </div>
       <div style="line-height:100px;text-align:center;">
         <conditions></conditions>
          <!-- 条件设置 -->
        </div>
      <div class="pitemcon">
        
          <div class="card"  v-for="(contype,indexitem) in item.conditionList" :key="indexitem">
            <div v-if="contype.conditionType=='yes'">
              <div class="pcard">
                条件是
              </div>
              <div class="pitemcon">
                <div v-if="contype.conditionList.length>0">
                  <proitem :list="contype.conditionList"></proitem>
                </div>
                  <a href="javascript:;"  v-else @click="addcondition(contype.prand)">添加</a>
              </div>
            </div>
            <div  v-if="contype.conditionType=='no'">
            <div class="pcard">
            条件否
          </div>
          <div class="pitemcon">
             <div v-if="contype.conditionList.length>0">
                  <proitem :list="contype.conditionList"></proitem>
                </div>
                  <a href="javascript:;"  v-else @click="addcondition(contype.prand)">添加</a>
          </div>
          </div>

          </div>

          
      </div>
      
      </div>
       <div class="icbottom" v-if="item.ismain">
        <i class="el-icon-circle-plus-outline" @click="comadd({proadd:true,index:index+1})"></i>
      </div>
      <div class="icbottom" v-if="item.ismain&&(index!=list.length-1)">
        <i class="el-icon-bottom"></i>
      </div>

 </div>
    </div>
</template>

<script>
import conditions from './components/conditions';
    import {mapState, mapGetters, mapMutations} from "vuex";
    import mixprocess from './mixprocess.js';
    export default {
      name: "proitem",
      props: {
        list: {
          required: true,
          type: Array
        }
      },
        data() {
            return {
            };
        },
        mixins: [mixprocess],
        components:{conditions},
        computed: {
            ...mapState('process',[
                'thid','conditionList'
            ]),
        },
        created(){
          
        },
        methods: {
            
        },
    };

</script>

<style lang="less" scoped>
.pcard{
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  padding:0 20px;
}

.pitemcon{
  
  overflow: auto;
   white-space: nowrap;
    padding: 20px;
}

.card{
  border: 1px solid #ccc;
  display: inline-block;
  min-width: 400px;
  vertical-align: top;
  margin: 20px;
}



.pcontainer{
  padding: 20px 10px;
}

.icbottom{
 text-align: center;
  height: 40px;
  .el-icon-bottom,.el-icon-circle-plus-outline{
    font-size: 40px;
   
  }
  .el-icon-circle-plus-outline{
    cursor: pointer;
  }
}

.el-icon-delete{
  line-height: 40px;
  font-size: 20px;
  color: red;
  cursor: pointer;
}
.pcard{
  display: flex;
  justify-content: space-between;
}
 
</style>
