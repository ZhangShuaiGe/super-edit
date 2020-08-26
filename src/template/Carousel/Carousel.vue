<template>
    <div
         class="carousel-box"
         :draggable="isEdit"
         @drag="drag($event)"
         @dragstart="dragStart($event,currentTemplateDate)"
         @click="showEdit"
         :style="{...styleObject}"
    >
        <el-carousel
            :height="styleObject.height"
            :autoplay="currentTemplateDate.autoplay"
            :interval="currentTemplateDate.interval"
            :type="currentTemplateDate.type"
            :direction="currentTemplateDate.direction"
            indicator-position="outside"
        >
            <el-carousel-item
                v-for="(val,key) in currentTemplateDate.children"
                :key="key"
            >
                <a class="abox" :href="val.href" target="_blank">
                    <img :src="val.url" alt="">
                </a>
            </el-carousel-item>
        </el-carousel>
        <div class="mask" v-if="isEdit"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props:["currentTemplateDate","templateName","styleObject"],
    }
</script>

<style lang="less" scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .carousel-box{
        .el-carousel__container{
            height: 100% !important;
        }
    }
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 90;
    }
    .abox{
        display: block;
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
