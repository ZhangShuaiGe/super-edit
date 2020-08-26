<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Carousel'" title="轮播配置" name="5">
            <div class="form_box top">
                <div class="form_box_item">
                    <span>是否自动轮播：</span>
                    <el-switch v-model="currentTemplateData.autoplay"></el-switch>
                </div>
                <div class="form_box_item">
                    <span>时间间隔：</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="currentTemplateData.interval">
                    </el-input>
                </div>
                <div class="form_box_item">
                    <span>选择轮播样式：</span>
                    <el-select v-model="currentTemplateData.type" placeholder="请选择">
                        <el-option label="默认" value=""></el-option>
                        <el-option label="卡片" value="card"></el-option>
                    </el-select>
                </div>
                <div class="form_box_item">
                    <span>选择轮播方向：</span>
                    <el-select v-model="currentTemplateData.direction" placeholder="请选择">
                        <el-option label="水平" value="horizontal"></el-option>
                        <el-option label="垂直" value="vertical"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="form_box">
                <div class="Carousel" v-for="(item,index) in currentTemplateData.children" :key="index">
                    <div class="form_box_item">
                        <span>图片{{index+1}}预览：</span>
                        <img width="150px" height="50px" :src="item.url" alt="">
                    </div>
                    <div class="form_box_item">
                        <span>图片{{index+1}}地址：</span>
                        <el-input
                                placeholder="请输入内容"
                                v-model="item.url">
                        </el-input>
                    </div>
                    <div class="form_box_item">
                        <span>图片{{index+1}}跳转：</span>
                        <el-input
                                placeholder="请输入内容"
                                v-model="item.href">
                        </el-input>
                    </div>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteCarousel(index)"></el-button>
                </div>

            </div>
            <div class="text-center">
                <el-button type="primary" @click="addCarousel">添加轮播项</el-button>
            </div>
        </el-collapse-item>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from "vuex";
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
            addCarousel(){
                this.currentTemplateData.children.push({
                    href:"https://www.baidu.com",
                    url:"https://img.xl-ai.com/mtk/1572246340895.jpg",
                });
            },
            deleteCarousel(index){
                if(this.currentTemplateData.children.length>1){
                    this.currentTemplateData.children.splice(index,1);
                }else{
                    this.$message('最少一张图!');
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .form_box{
        text-align: center;
    }
    .Carousel{
        margin-bottom: 30px;
    }
    .text-center{
        text-align: center;
    }
    .top{
        border-bottom: 1px solid #cccc;
        margin: 0px 10px 30px;
    }
</style>
