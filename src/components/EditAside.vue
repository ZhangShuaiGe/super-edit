<template>
    <div class="aside-box">
        <!-- 		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" active-text-color="#303133">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">业务组件</span>
                </template>
                <el-menu-item-group>
                    <div v-for="(val,key) in businessList" :key="key">
                        <el-menu-item
                                v-if="val.id!='Form'"
                                draggable="true"
                                @drag.native="drag($event,val.id)"
                                :key="key">
                            {{val.name}}
                        </el-menu-item>
                        <el-submenu index="2-4" v-else>
                            <template slot="title">表单选项</template>
                            <el-menu-item index="2-4-1"
                                          draggable="true"
                                          @drag.native="drag($event,val.id)">
                                {{val.name}}
                            </el-menu-item>
                            <div v-for="(item,index) in formitem" :key="index">
                                <el-menu-item :index="'formitem'+index"
                                              draggable="true"
                                              @dragstart.native="dragstartItem($event,item)"
                                              @drag.native="dragItem($event,item)"
                                >{{item.elementName}}
                                </el-menu-item>
                            </div>
                        </el-submenu>
                    </div>

                </el-menu-item-group>

            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">装饰组件</span>
                </template>
                <el-menu-item-group>
                    <!-- <span slot="title">表单</span> -->
                    <el-menu-item
                            v-for="(val,key) in styleList"
                            draggable="true"
                            @drag.native="drag($event,val.id)"
                            :key="key">
                        {{val.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">功能组件</span>
                </template>
                <el-menu-item-group>
                    <!-- <span slot="title">表单</span> -->
                    <el-menu-item
                            v-for="(val,key) in fucList"
                             @click="add($event,val.id)"
                            draggable="true"
                            @drag.native="drag($event,val.id)"
                            :key="key">
                        {{val.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">图表组件</span>
                </template>
                <el-menu-item-group>
                    <!-- <span slot="title">表单</span> -->
                    <el-menu-item
                            v-for="(val,key) in chartsList"
                             @click="add($event,val.id)"
                            draggable="true"
                            @drag.native="drag($event,val.id)"
                            :key="key">
                        {{val.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import {v4 as uuid} from 'uuid';
    import webData from "@/template/template.config.js";
    import formdata from "@/template/Form/template.js";
    import {mapState, mapMutations} from "vuex"

    export default {
        data() {
            return {
                isCollapse: false,//控制菜单缩放
                isDrag: "",
                businessList: [//业务组件
                
                    {
                        id: "Pagination",
                        name: "分页",
                    },
                    {
                        id: "Form",
                        name: "表单",
                    },
                    {
                        id: "Table",
                        name: "表格",
                    },
                    {
                        id: "Img",
                        name: "图片",
                    },
                    {
                        id: "Text",
                        name: "文本",
                    },
                    {
                        id: "Icon",
                        name: "图标",
                    },
                    {
                        id: "TabsContainer",
                        name: "Tabs标签",
                    },
                    {
                        id: "Breadcrumb",
                        name: "Breadcrumb面包屑",
                    },
                    {
                        id: "Container",
                        name: "栅格",
                    },
                    {
                        id:"Carousel",
                        name:"轮播"
                    },
                    {
                        id:"Divider",
                        name:"分割线"
                    }
                ],
                formitem: JSON.parse(JSON.stringify(formdata.children)),
                styleList: [//装饰组件
                    {
                        id: "ColorBlock",
                        name: "背景框"
                    },
                    {
                        id: "Circular",
                        name: "圆形框"
                    }
                ],
                fucList: [//功能组件
                    {
                        id: "StatusPage",
                        name: "状态页面"
                    },
                ],
                chartsList: [//功能组件
                    {
                        id: "Linecharts",
                        name: "折线图"
                    },
                    {
                        id: "Barcharts",
                        name: "柱状图"
                    },
                    {
                        id: "Piecharts",
                        name: "饼图"
                    },
                    {
                        id: "Scatter",
                        name: "散点图"
                    },
                ],
            };
        },
        computed: {
            ...mapState([
                "templateData",
            ])
        },
        methods: {
            ...mapMutations([
                "templateDataConfig",
                "templateDataModule",
                "stateChange"
            ]),
            //拖拽添加组件
            drag(e, moduleFlag) {
                e.preventDefault();
//            console.log("拖拽的组件:",moduleFlag);
                this.stateChange(["dragModel", moduleFlag]);
            },
            dragstartItem(e, val) {
                // e.preventDefault();
                val.name = `${val.elementType}-${uuid()}`;
                val.x = 0;
                val.y = 0;
                let moduleArr = JSON.parse(JSON.stringify(this.templateData.module));
                
                if (moduleArr.length == 0) {
                    this.formItemadd(val);

                    // this.$message('请先添加Form表单项');
                    // e.preventDefault();
                    // e.stopPropagation();
                    return;
                }
                for (let i = 0; i < moduleArr.length; i++) {
                    if (/Form/.test(moduleArr[i])) {
                        val.name = `${val.elementType}-${uuid()}`;
                        val.x = 0;
                        val.y = 0;
                        let positionObj = {
                            x: 0,
                            y: 0,
                            l: 0,
                            t: 0,
                        };

                        let obj = {
                            key: this.templateData.config[moduleArr[i]].children.length,
                            templateName: moduleArr[i],
                            tempdata: val
                        };
                        this.$store.commit("stateChange", ["dragObj", Object.assign(obj, positionObj)]);
                        this.$store.commit("stateChange", ["currentModule", ""]);


                        break;
                    }
                    ;
                    if (i == moduleArr.length - 1) {
                        this.formItemadd(val);
                        // this.$message('请先添加Form表单项');
                        // e.preventDefault();
                        // e.stopPropagation();
                        return;
                    }
                }

            },
            formItemadd(val){
                let flag = this.$random();
                    let Form=JSON.parse(JSON.stringify(formdata));
                    let btnobj='';
                    for(let i=0;i<Form.children.length;i++){
                        if(Form.children[i].elementType=='button'){
                            btnobj=Form.children[i];
                            break;
                        }
                    };
                    btnobj.y=100;
                    Form.children=[val,btnobj]
                    let formItemObj={
                         tempdata: Form,
                         templateName:`Form_${flag}`,
                         formitemadd:true,
                    };
                    console.log(formItemObj,Form);
                    this.$store.commit("stateChange", ["dragObj",formItemObj]);
            },
            dragItem(e, val) {
                e.preventDefault();
            },
            // 菜单控制
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        }
    };
</script>
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
<style lang="less" scoped>
    .aside-box {
        position: fixed;
        left: 0;
        bottom: 0;
        top: @editTop;
        // border-right: 1px solid @editBorderColor;
    }
</style>
