<template>
    <div
            :draggable="isEdit"
            @drag.stop="drag($event)"
            @dragstart.stop="dragStart($event,currentTemplateDate)"
            @click.stop="showEdit"
            :style="{...styleObject}"
            @drop="containerDrop"
            @dragover="containerdragover"
            @dragleave="containerdragleave "
    >
        <component
                v-for="(val,key) in moduleAll"
                :is="val"
                :templateName="val"
                :currentTemplateDate="templateData.config[val]"
                :key="key"
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
</template>

<script>
    import Vue from "vue";
    import {mapState, mapMutations, mapGetters} from "vuex";
    import webData from "@/template/template.config.js";

    export default {
        data() {
            return {
                moduleAll: []
            }
        },
        computed: {
            ...mapState(["dragObj", "templateData", "dragModel"])
        },
        props: ["currentTemplateDate", "templateName", "styleObject"],
        created() {
            this.loading();
        },
        watch: {
            currentTemplateDate: {
                handler: function (val) {
                    this.loading();
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            ...mapMutations(["templateDataConfig", "templateDataModule", "dropTemplateDataDelete"]),
            loading() {
                this.moduleAll = this.currentTemplateDate.children;
                if (this.moduleAll.length) {
                    this.moduleAll.map((val, key) => {
                        let templateName = val.split("_")[0];
                        return Vue.component(
                                val,
                                require(`@/template/${templateName}/${templateName}.vue`).default
                        );
                    });
                }
            },
            containerDrop(e) {
                e.preventDefault();
                let $x = "";
                let $y = "";
                //阻止容器互相嵌套
                if(this.dragObj.templateName == this.templateName || this.dragModel.indexOf("Container")!="-1" || this.dragObj&&this.dragObj.templateName.indexOf("Container")!="-1"){
                    return ;
                }
                //阻止往别的容器拖拽元素
                let isprent = null;
                if(this.dragObj.tempdata&&this.dragObj.tempdata.parentmodelobj&&this.dragObj.tempdata.parentmodelobj.parentModelName){
                    isprent = this.dragObj.tempdata.parentmodelobj.parentModelName;
                }

                if(isprent && isprent != this.templateName){
                    e.stopPropagation();
                    return;
                }
                //已存在元素往栅格拖动
                if (this.dragObj) {
                    e.stopPropagation();

                    if(this.dragObj.formitemadd){//新加单个表单项
                            this.dragObj.tempdata.x = e.clientX-200-this.currentTemplateDate.x;
                            this.dragObj.tempdata.y = e.pageY-70-this.currentTemplateDate.y;;
                            this.dragObj.tempdata.parentmodelobj={parentModelName:this.templateName}
                            this.templateDataConfig({
                                templateName: this.dragObj.templateName,
                                currentTemplateDate: this.dragObj.tempdata,
                            });
                            this.templateDataModule(this.dragObj.templateName);
                            let currentTemplateDate = JSON.parse(JSON.stringify(Object.assign({},this.currentTemplateDate)));
                            currentTemplateDate.children.push(this.dragObj.templateName);
                            this.templateDataConfig({
                            "templateName":this.templateName,
                            "currentTemplateDate":currentTemplateDate,
                        });
                         this.$store.commit("stateChange", ["dragObj", ""]);
                            return ;
                        };

                    //当前【拖动】模块数据
                    let ModuleDate = JSON.parse(JSON.stringify(this.templateData)).config[this.dragObj.templateName];
                    let newDragObj = JSON.parse(JSON.stringify(this.dragObj));

                    //改坐标
                    if (newDragObj.key || newDragObj.key == 0) {
                        $x = e.clientX - (this.dragObj.x - this.dragObj.l);
                        $y = e.clientY - (this.dragObj.y - this.dragObj.t);
                        if (newDragObj.key >= ModuleDate.children.length) {
                            ModuleDate.children.push(this.dragObj.tempdata)
                            ModuleDate.children[newDragObj.key].x = e.clientX - 200 - ModuleDate.x-this.currentTemplateDate.x;
                            ModuleDate.children[newDragObj.key].y = e.pageY - 70 - ModuleDate.y-this.currentTemplateDate.y;
                        } else {
                            ModuleDate.children[newDragObj.key].x = $x;
                            ModuleDate.children[newDragObj.key].y = $y;
                        }
                    } else {
                        $x = e.clientX - (this.dragObj.x - this.dragObj.l);
                        $y = e.clientY - (this.dragObj.y - this.dragObj.t);
                        ModuleDate.x = $x;
                        ModuleDate.y = $y;
                    }

                    let currentTemplateDate = JSON.parse(JSON.stringify(Object.assign({},this.currentTemplateDate)));
                    //是否从外面往里面拖动
                    if(!currentTemplateDate.children.includes(this.dragObj.templateName)){
                        ModuleDate.x = e.clientX-200-this.currentTemplateDate.x;
                        ModuleDate.y = e.pageY-70-this.currentTemplateDate.y;
                    }

                    //记录所在的容器name
                    ModuleDate.parentmodelobj = {parentModelName: this.templateName};
                    //修改当前拖动元素的坐标数据 并且归属到栅格下
                    this.$store.commit("dragchangetemp", {
                        templateName: newDragObj.templateName,
                        currentTemplateDate: ModuleDate,
                    });

                    //当前拖动元素 分配到 栅格名下(不能包含自己)
                    currentTemplateDate.children.includes(this.dragObj.templateName)
                    ||
                    this.dragObj.templateName == this.templateName
                            ?
                            null :
                            currentTemplateDate.children.push(this.dragObj.templateName);

                    this.templateDataConfig({
                        "templateName": this.templateName,
                        "currentTemplateDate": currentTemplateDate,
                    });

                    //删除model中的数据
//                    this.dragObj.templateName == this.templateName?null:this.dropTemplateDataDelete(this.dragObj.templateName);
                    //松开清空当前拖动元素数据
                    this.$store.commit("stateChange", ["dragObj", ""]);
                } else {
                    e.stopPropagation();
                    //侧边栏直接往栅格拖动
                    $x = e.pageX - 200 - this.currentTemplateDate.x;
                    $y = e.pageY - 65 - this.currentTemplateDate.y;
                    let moduleFlag = this.dragModel;
                    let newWebData = JSON.parse(JSON.stringify(webData));
                    newWebData[moduleFlag].x = $x;
                    newWebData[moduleFlag].y = $y;
                    //记录所在的容器name
                    newWebData[moduleFlag].parentmodelobj = {parentModelName: this.templateName};
                    //新建拖拽的组件名字
                    let newTemplateName = `${moduleFlag}_${this.$random()}`;
                    this.templateDataConfig({
                        templateName: newTemplateName,
                        currentTemplateDate: newWebData[moduleFlag],
                    });

                    this.templateDataModule(newTemplateName);

                    //当前拖动元素 分配到 栅格名下(不能包含自己)
                    let currentTemplateDate = Object.assign({}, this.currentTemplateDate);
                    currentTemplateDate.children.push(newTemplateName);
                    this.templateDataConfig({
                        "templateName": this.templateName,
                        "currentTemplateDate": currentTemplateDate,
                    });
                }
            },
            containerdragover(e) {
                e.preventDefault();
                e.stopPropagation();
            },
            containerdragleave(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
