<template>
    <div>
        <div class="form_box">
          <el-row>
            <el-col :span="8" v-for="(val,key) in formitem"  :key="key" style="padding:10px 0;">
              <el-button @click="add(val,key)">{{val.elementName}}</el-button>
            </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from "vuex";
    import formdata from "@/template/Form/template.js";
    import { v4 as uuid } from 'uuid';
    export default {
        data () {
            return {
                formitem:JSON.parse(JSON.stringify(formdata.children)),
            }
        },
        computed:{
            ...mapState([
                "currentTemplateData",
                "currentModule",
            ]),
            
        },
        methods:{
            add(val,key){
              val.name=`${val.elementType}-${uuid()}`;
              val.x=0;val.y=0;
              let nobj=Object.assign({},this.currentTemplateData);
              nobj.children.push(val);
              this.$store.commit("stateChange",["currentTemplateData",nobj]);
             
            },
        },
        created(){
           console.log('0000',formdata);
        },

    }
</script>

<style lang="less" scoped>
.form_box{
  font-size:13px;
  color: #303133;
}
</style>

