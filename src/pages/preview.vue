<template>
    <div>

        <vue-ruler-tool
                class="preview-box"
                v-if="showRuler"
                @drop.native="drop"
                @dragover.native="dragover"
                :style="{
					width:templateData.page.width + 'px',
					height:templateData.page.height + 'px',
					background:templateData.page.background
				}"
                :config="{width:templateData.page.width,height:templateData.page.height}"
                :content-layout="{left:0,top:0}"
                :is-scale-revise="true"
                :is-hot-key="false"
                :v-model="presetLine"
        >
            <loadTemplate />
        </vue-ruler-tool>
        <loadTemplate
              class="loadTemplate-box"
              :style="{
					width:templateData.page.width + 'px',
					height:templateData.page.height + 'px',
					background:templateData.page.background
              }"
         v-else/>
    </div>
</template>

<script>
    import Vue from "vue";
    import webData from "@/template/template.config.js";
    import {mapState, mapGetters, mapMutations} from "vuex";
    import loadTemplate from "./components/loadTemplate.vue";
    export default {
        data() {
            return {
                presetLine: [{type: 'l', site: 100}, {type: 'v', site: 200}],
                showRuler:"",
            };
        },
        components:{
            loadTemplate
        },
        computed: {
            ...mapGetters(["getModule"]),
            ...mapState([
                "templateData",
                "currentTemplateData",
                "currentModule",
                "dragModel",
                "dragObj",
            ]),
        },
        created(){
            if(location.pathname=="/edit"){
                this.showRuler = true;
            }else{
                this.showRuler = false;
            }
        },
        methods: {
            ...mapMutations(["templateDataConfig", "templateDataModule"]),
            //鼠标放下
            drop(e) {
                e.preventDefault();
                e.stopPropagation();
                // let $x = e.offsetX;
                // let $y = e.offsetY;
                let $x = "";
                let $y = "";

                if (this.dragObj) {
                    if(this.dragObj.formitemadd){//新加单个表单项
                        let $x = e.pageX - e.target.offsetLeft;
                        let $y = e.pageY - e.target.offsetTop;
                        this.dragObj.tempdata.x = $x;
                        this.dragObj.tempdata.y = $y;
                        this.templateDataConfig({
                            templateName: this.dragObj.templateName,
                            currentTemplateDate: this.dragObj.tempdata,
                        });
                        this.templateDataModule(this.dragObj.templateName);
                         this.$store.commit("stateChange", ["dragObj", ""]);
                        return ;
                    }
                    //当前【拖动】模块数据
                    let ModuleDate = JSON.parse(JSON.stringify(Object.assign({}, this.templateData))).config[this.dragObj.templateName];
                    let newDragObj = JSON.parse(JSON.stringify(Object.assign({}, this.dragObj)));
                    if (newDragObj.key || newDragObj.key == 0) {
                        $x = e.clientX - (this.dragObj.x - this.dragObj.l);
                        $y = e.clientY - (this.dragObj.y - this.dragObj.t);
                        if (newDragObj.key >= ModuleDate.children.length) {
                            ModuleDate.children.push(this.dragObj.tempdata)
                            ModuleDate.children[newDragObj.key].x = e.clientX - 200 - ModuleDate.x;
                            ModuleDate.children[newDragObj.key].y = e.pageY - 70 - ModuleDate.y;
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

                    //如果组件有绑定栅格关系，双向删除关联关系
                    let parentModelName = ModuleDate.parentmodelobj ? ModuleDate.parentmodelobj.parentModelName : null;
                    if (parentModelName) {
                        //子断绝关系
                        delete ModuleDate.parentmodelobj;
                        //父断绝关系
                        let newContainer = Object.assign({}, this.templateData.config[parentModelName]);
                        if (/Tabs/.test(parentModelName)) {
                            let index1 = '', index2 = '';
                            for (let n = 0; n < newContainer.children.length; n++) {
                                for (let m = 0; m < newContainer.children[n].children.length; m++) {
                                    if (newContainer.children[n].children[m] == this.dragObj.templateName) {
                                        index1 = n;
                                        index2 = m;
                                    }
                                }
                            }
                            ;
                            newContainer.children[index1].children.splice(index2, 1);

                        } else {
                            let newArr = newContainer.children.filter((val, key) => {
                                return val != this.dragObj.templateName;
                            });
                            newContainer.children = newArr;
                        }


                        this.templateDataConfig({
                            templateName: parentModelName,
                            currentTemplateDate: newContainer,
                        })

                        ModuleDate.x = ModuleDate.x + this.templateData.config[parentModelName].x;
                        ModuleDate.y = ModuleDate.y + this.templateData.config[parentModelName].y;
                    }

                    this.$store.commit("dragchangetemp", {
                        templateName: newDragObj.templateName,
                        currentTemplateDate: ModuleDate,
                    });
                    this.$store.commit("stateChange", ["dragObj", ""]);
                } else {
                    $x = e.pageX - e.target.offsetLeft;
                    $y = e.pageY - e.target.offsetTop;
                    let moduleFlag = this.dragModel;
                    let newWebData = JSON.parse(JSON.stringify(webData));
                    newWebData[moduleFlag].x = $x;
                    newWebData[moduleFlag].y = $y;
                    let flag = this.$random();
                    this.templateDataConfig({
                        templateName: `${moduleFlag}_${flag}`,
                        currentTemplateDate: newWebData[moduleFlag],
                    });
                    this.templateDataModule(`${moduleFlag}_${flag}`);
                    this.$store.commit("stateChange", ["dragModel", ""]);
                }
            },
            //鼠标经过
            dragover(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
    };

</script>

<style lang="less" scoped>
    .preview-box {
        position: relative;
        margin: 0 auto;
    }
    .loadTemplate-box{
        position: relative;
        margin: -18px auto 0;
    }
</style>
