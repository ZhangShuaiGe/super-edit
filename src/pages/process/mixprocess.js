import processdata from './template.js';
import {mapState, mapGetters, mapMutations} from "vuex";
export default {
  data() {
    return {
      nprocessdata:'',
      editconditionList:'',
    };
  },
  methods: {
    ...mapMutations('process',["stateChange"]),
      addcondition(item){
        this.stateChange(['thid',item]);
        this.stateChange(['conditionVisible',true]);
      },
      comadd(obj){
        this.stateChange(['thid',obj]);
        this.stateChange(['conditionVisible',true]);
      },
      initdata(){
        let prone=JSON.parse(JSON.stringify(processdata));
        prone.prand=this.$random(true,20,20);
        for(let i=0;i<prone.conditionList.length;i++){
          prone.conditionList[i].prand=this.$random(true,20,20);
        };
        this.nprocessdata=prone;
      },
      initList(){
        this.editconditionList=JSON.parse(JSON.stringify(this.conditionList));
      },
      comloop(fn){
        for(let i=0;i<this.editconditionList.length;i++){
            fn(this.editconditionList[i],this.thid);
        }
      },
      addlist(){
        console.log('***********',this.thid)
        this.initList();
        if(this.thid.proadd){
          this.initdata();
          this.nprocessdata.ismain=true;
          this.editconditionList.splice(this.thid.index,0,this.nprocessdata)
          // this.editconditionList.push(this.nprocessdata);
          this.stateChange(['conditionList',this.editconditionList]);
          return ;
        }
        this.comloop(this.additem);
      },

      additem(a,r){
        for(let i=0;i<a.conditionList.length;i++){
          if(a.conditionList[i].prand==r){
            this.initdata();
            a.conditionList[i].conditionList.push(this.nprocessdata);
            this.stateChange(['conditionList',this.editconditionList]);
            return ;
          }
          if(a.conditionList[i].conditionList.length>0){
            this.additem(a.conditionList[i],r)
          }
          
        }

      },
      delcondition(r){
        this.stateChange(['thid',r]);
        this.initList();
        for(let i=0;i<this.editconditionList.length;i++){
          if(this.editconditionList[i].prand==this.thid){
            this.editconditionList.splice(i,1);
            this.stateChange(['conditionList',this.editconditionList]);
            break ;
          }else{
            this.delitem(this.editconditionList[i],this.thid);
          }
          
        }
      },
      delitem(a,r){
        if(a.conditionList.length>0){
          for(let i=0;i<a.conditionList.length;i++){
            if(a.conditionList[i].prand==r){
              this.editconditionList.splice(i,1);
              this.stateChange(['conditionList',this.editconditionList]);
              return;
            }else if(a.conditionList[i].conditionList.length>0){
              for(let m=0;m<a.conditionList[i].conditionList.length;m++){
                if(a.conditionList[i].conditionList[m].prand==r){
                  a.conditionList[i].conditionList.splice(m,1);
                  this.stateChange(['conditionList',this.editconditionList]);
                  return;
                }else{
                  this.delitem(a.conditionList[i].conditionList[m],r)
                }
              }
            }
          }
        }
      }
  }
}
