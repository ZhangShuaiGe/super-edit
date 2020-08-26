<template>
    <div>
        <el-collapse-item title="基础配置" name="1">
            <!--{{JSON.stringify(currentTemplateData)}}-->
            <!-- {{moduleflag}} -->
            <div class="form_box">
                <div class="form_box_item">
                    <span>层级：</span>
                    <el-input v-model="currentTemplateData.zIndex"></el-input>
                </div>
                <div class="form_box_item">
                    <span>宽度：</span>
                    <el-input v-model="currentTemplateData.width"></el-input>
                </div>
                <div class="form_box_item">
                    <span>高度：</span>
                    <el-input v-model="currentTemplateData.height"></el-input>
                </div>
                <div class="form_box_item">
                    <span>x坐标：</span>
                    <el-input-number v-model="currentTemplateData.x" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="form_box_item">
                    <span>y坐标：</span>
                    <el-input-number v-model="currentTemplateData.y" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="form_box_item">
                    <span>背景色：</span>
                    <el-color-picker v-model="currentTemplateData.background"></el-color-picker>
                </div>
                <div class="form_box_item">
                    <span>字体颜色：</span>
                    <el-color-picker v-model="currentTemplateData.color"></el-color-picker>
                </div>
                <div class="form_box_item">
                    <span>字体大小：</span>
                    <el-input-number v-model="currentTemplateData.fontSize" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="form_box_item">
                    <span>透明度：</span>
                    <el-slider style="width: 300px" v-model="currentTemplateData.opacity"></el-slider>
                </div>
                <div class="form_box_item">
                    <span>旋转：</span>
                    <el-slider style="width: 300px" :max="360" v-model="currentTemplateData.rotate"></el-slider>
                </div>
                <div class="form_box_item">
                    <span>操作：</span>
                    <el-button @click="deleteDate" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
            </div>
        </el-collapse-item>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from "vuex";
    export default {
        data () {
            return {
                value4: 48,
            }
        },
        computed:{
            ...mapState([
                "templateData",
                "currentTemplateData",
                "currentModule",
            ]),
            moduleflag(){
                return this.currentModule?this.currentModule.split("_")[0]:null;
            },
        },
        methods:{
            ...mapMutations([
                "templateDataDelete",
                "templateDataConfig",
            ]),
            //数组去重
            deleteRepeat(val,ArrData){
                return ArrData.filter((data,key)=>{
                    return data != val;
                })
            },
            deleteDate(){
                let currentModule = this.currentModule;
                //栅格组件删除，需要删除里面的子元素
                 if(currentModule.indexOf("Tabs")!="-1"){
                    let arr = this.currentTemplateData.children;
                    arr.map((val,key)=>{
                        val.children.map((item,index)=>{
                            this.templateDataDelete(item);
                        })
                    });
                }else if(currentModule.indexOf("Container")!="-1"){
                    let arr = this.currentTemplateData.children;
                    arr.map((val,key)=>{
                        this.templateDataDelete(val);
                    });
                }


                //是否是删除栅格里面的组件
                let parentModelName = this.templateData.config[currentModule].parentmodelobj?
                        this.templateData.config[currentModule].parentmodelobj.parentModelName
                        :
                        null;

                //清除父组件关联关系
                if(parentModelName && parentModelName.indexOf("Tabs") !="-1"){
                    //读取父栅格组件数据
                    let parentObj = Object.assign({},this.templateData.config[parentModelName]);
                    for(let i=0;i<parentObj.children.length;i++){
                        let arr = parentObj.children[i].children;
                        parentObj.children[i].children = this.deleteRepeat(currentModule,arr);
                    }
                    this.templateDataConfig({
                        "templateName":parentModelName,
                        "currentTemplateDate":parentObj
                    });
                }else if(parentModelName && parentModelName.indexOf("Container")!="-1"){
                    //读取父栅格组件数据
                    let parentObj = Object.assign({},this.templateData.config[parentModelName]);
                    //删除父级里存储的关联关系
                    parentObj.children = this.deleteRepeat(currentModule,parentObj.children);
                    this.templateDataConfig({
                        "templateName":parentModelName,
                        "currentTemplateDate":parentObj
                    });
                }

                this.templateDataDelete(currentModule);
            },
        }
    }
</script>

<style lang="less" scoped>
    .form_box{
        .form_box_item{
            margin-bottom: 20px;
            display: flex;
            // justify-content: center;
            align-items: center;
            &>span{
                display: inline-block;
                width: 100px;
                text-align: left;
            }
        }
    }
</style>
