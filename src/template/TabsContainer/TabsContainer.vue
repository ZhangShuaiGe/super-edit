<template>
    <div>
        <div
            :draggable="isEdit"
            @drag.stop="drag($event)"
            @dragstart.stop="dragStart($event,currentTemplateDate)"
            @click.stop="showEdit"
            :style="{...styleObject}"
        >
           <tabs type="border-card"  v-model="editableTabsValue">

                <tab-pane v-for="(item,index) in currentTemplateDate.children" :key="index" :label="item.tabName" :name="item.name">
                    <div class="tabscontainer" @drop=tabsdrap($event,index)  :style="{height:currentTemplateDate.height-73+'px'}">
                        <div v-for="(val,key) in item.children" :key="key">
                            <component v-if="templateData.config[val]"
                                :is="val"
                                :templateName="val" 
                                :currentTemplateDate="templateData.config[val]"
                                :styleObject="{
                                   position:'absolute',
                                    zIndex:templateData.config[val].zIndex,
                                    width:templateData.config[val].width?templateData.config[val].width + 'px' : 'auto',
                                    height:templateData.config[val].height?templateData.config[val].height + 'px' : 'auto',
                                    left:templateData.config[val].x+'px',
                                    top:templateData.config[val].y+'px',
                                    background:templateData.config[val].background,
                                    fontSize:templateData.config[val].fontSize + 'px',
                                    opacity:(templateData.config[val].opacity||templateData.config[val].opacity==0?templateData.config[val].opacity/100:templateData.config[val].opacity = 100) ,
                                    transform:`rotate(${templateData.config[val].rotate}deg)`,
                                }"
                                >
                            </component>
                        </div>
                    </div>
                </tab-pane>


            </tabs>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store';
    import Vue from "vue";
    import Tabs from "@/components/Tabs/tabs.vue";
    import TabPane from "@/components/Tabs/tab-pane.vue";
import {mapState,mapMutations,mapGetters} from "vuex";
import webData from "@/template/template.config.js";
    export default {
        data() {
            return {
                editableTabsValue:'',
            }
        },
        components:{
            Tabs,
            TabPane
        },
        props: ["currentTemplateDate", "templateName", "styleObject"],
        computed:{
            ...mapState([
                "dragObj",
                "dragModel",
                "templateData"
            ]),
           
        },
        created(){
            this.editableTabsValue=this.currentTemplateDate.children[0].name;
            this.loading();
        },
        methods:{
            ...mapMutations(["templateDataConfig","templateDataModule","dropTemplateDataDelete"]),
            tabsdrap(e,index){
                e.preventDefault();
                if(!(this.dragObj&&/Container/.test(this.dragObj.templateName)||/Container/.test(this.dragModel))){
                    if(this.dragObj&&this.dragObj.tempdata.parentmodelobj&&this.dragObj.tempdata.parentmodelobj.parentModelName!=this.templateName){
                        return ;
                    }
                    e.stopPropagation();
                    let $x = "";
			        let $y = "";
                     if(this.dragObj){
                          //新建拖拽的组件名字
                        if(this.dragObj.formitemadd){//新加单个表单项
                            this.dragObj.tempdata.x = e.clientX-200-this.currentTemplateDate.x;
                            this.dragObj.tempdata.y = e.pageY-70-this.currentTemplateDate.y;;
                            this.dragObj.tempdata.parentmodelobj={parentModelName:this.templateName,parentModelIndex:index}
                            this.templateDataConfig({
                                templateName: this.dragObj.templateName,
                                currentTemplateDate: this.dragObj.tempdata,
                            });
                            this.templateDataModule(this.dragObj.templateName);
                            let currentTemplateDate = JSON.parse(JSON.stringify(Object.assign({},this.currentTemplateDate)));
                            currentTemplateDate.children[index].children.push(this.dragObj.templateName);
                            this.templateDataConfig({
                            "templateName":this.templateName,
                            "currentTemplateDate":currentTemplateDate,
                        });
                         this.$store.commit("stateChange", ["dragObj", ""]);
                            return ;
                        };


                        let neobj = JSON.parse(JSON.stringify(Object.assign({}, this.templateData))).config[this.dragObj.templateName];
                            let nedrobj = JSON.parse(JSON.stringify(Object.assign({}, this.dragObj)));
                            if (nedrobj.key || nedrobj.key == 0) {
                                $x = e.clientX - (this.dragObj.x - this.dragObj.l);
                                $y = e.clientY - (this.dragObj.y - this.dragObj.t);
                                if(nedrobj.key>=neobj.children.length){
                                    neobj.children.push(this.dragObj.tempdata);
                                    neobj.children[nedrobj.key].x = e.clientX-200-neobj.x-this.currentTemplateDate.x;
                                    neobj.children[nedrobj.key].y = e.pageY-70-neobj.y-this.currentTemplateDate.y;
                                }else{
                                    neobj.children[nedrobj.key].x = $x;
                                    neobj.children[nedrobj.key].y = $y;
                                }
                                

                            } else {
                                $x = e.clientX - (this.dragObj.x - this.dragObj.l);
                                $y = e.clientY - (this.dragObj.y - this.dragObj.t);
                                neobj.x = $x;
                                neobj.y = $y;
                            }

                            neobj.parentmodelobj={parentModelName:this.templateName,parentModelIndex:index}

                           
                            
                            let currentTemplateDate = JSON.parse(JSON.stringify(Object.assign({},this.currentTemplateDate)));
                            if(currentTemplateDate.children[index].children.indexOf(this.dragObj.templateName)=="-1"){//不存在
                                currentTemplateDate.children[index].children.push(this.dragObj.templateName);
                                this.templateDataConfig({
                                    "templateName":this.templateName,
                                    "currentTemplateDate":currentTemplateDate,
                                });
                                neobj.x = e.clientX-200-this.currentTemplateDate.x;
                                neobj.y = e.pageY-70-this.currentTemplateDate.y-40;
                            }

                             this.$store.commit("dragchangetemp", {
                                templateName: nedrobj.templateName,
                                currentTemplateDate: neobj,
                            });
                            
                            this.$store.commit("stateChange", ["dragObj", ""]);

                     }else{
                        //  this.currentTemplateDate.children[index].children.push(this.dragObj)
                        //侧边栏直接往栅格拖动
                        // $x = e.pageX - e.target.offsetLeft;
                        // $y = e.pageY - e.target.offsetTop;
                        let moduleFlag = this.dragModel;
                        let newWebData = JSON.parse(JSON.stringify(webData));
                        newWebData[moduleFlag].x = e.clientX-200-this.currentTemplateDate.x;
                        newWebData[moduleFlag].y = e.pageY-70-this.currentTemplateDate.y;
                        //新建拖拽的组件名字
                        let newTemplateName = `${moduleFlag}_${this.$random()}`;
                        newWebData[moduleFlag].parentmodelobj={parentModelName:this.templateName,parentModelIndex:index}
                        this.templateDataConfig({
                            templateName: newTemplateName,
                            currentTemplateDate: newWebData[moduleFlag],
                        });

                        //当前拖动元素 分配到 栅格名下(不能包含自己)
                        let currentTemplateDate = JSON.parse(JSON.stringify(Object.assign({},this.currentTemplateDate)));
                        // currentTemplateDate.parentmodelobj={parentModelName:this.templateName,parentModelIndex:index};
                        // currentTemplateDate.children.push(newTemplateName);
                        currentTemplateDate.children[index].children.push(newTemplateName);
                        this.templateDataConfig({
                            "templateName":this.templateName,
                            "currentTemplateDate":currentTemplateDate,
                        });
                        this.templateDataModule(newTemplateName);

                     }
                }
            },

            loading() {
                if (this.templateData.module) {
                    this.templateData.module.map((val, key) => {
                        let templateName = val.split("_")[0];
                        return Vue.component(
                            val,
                            require(`@/template/${templateName}/${templateName}.vue`).default
                        );
                    });
                }
            },
        },
        watch: {
            currentTemplateDate: {
                handler: function(val) {

                    this.loading();
                },
                deep: true,
                immediate: true,
            },
        },
    }
</script>

<style lang="less" scoped>
.tabscontainer{
    // height:250px;
    // border: 1px dashed #999;
}
</style>
