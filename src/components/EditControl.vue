<template>
    <div class="editControl-box">
        <el-drawer
            title="我是标题"
            :visible.sync="showEditControl"
            :show-close="true"
            :before-close="handleClose"
            :destroy-on-close="true"
            :with-header="false"
        >
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基本设置" name="first">
                        <CommonConfig></CommonConfig>
                        <PageConfig></PageConfig>
                        <ColorBlockConfig></ColorBlockConfig>
                        <FormConfig></FormConfig>
                        <ImgConfig></ImgConfig>
                        <TextConfig></TextConfig>
                        <IconConfig></IconConfig>
                        <TabConfig></TabConfig>
                        <CircularConfig></CircularConfig>
                        <BreadcrumbConfig></BreadcrumbConfig>
                        <StatusPageConfig></StatusPageConfig>
                        <CarouselConfig></CarouselConfig>
                        <Divider></Divider>
                        <Pagination :data='data'></Pagination>
                    </el-tab-pane>
                    <el-tab-pane v-if="showEditControl" label="字段绑定" name="bindfild">
                        <Bindfield></Bindfield>
                    </el-tab-pane>
                    <el-tab-pane label="表单设置" name="second" v-if="/Form/.test(currentModule)">
                        <FormItemConfig></FormItemConfig>
                    </el-tab-pane>
                </el-tabs>
            </el-collapse>
        </el-drawer>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import CommonConfig from "./EditControl/CommonConfig.vue";
import PageConfig from "./EditControl/PageConfig.vue";
import ColorBlockConfig from "./EditControl/ColorBlockConfig.vue";
import FormConfig from "./EditControl/FormConfig.vue";
import ImgConfig from "./EditControl/ImgConfig.vue";
import TextConfig from "./EditControl/TextConfig.vue";
import IconConfig from "./EditControl/IconConfig.vue";
import FormItemConfig from "./EditControl/FormItemConfig.vue";
import TabConfig from "./EditControl/TabConfig.vue";
import CircularConfig from "./EditControl/CircularConfig.vue";
import BreadcrumbConfig from "./EditControl/BreadcrumbConfig.vue";
import StatusPageConfig from "./EditControl/StatusPageConfig.vue";
import CarouselConfig from "./EditControl/CarouselConfig.vue";
import Bindfield from "./EditControl/Bindfield.vue";
import Divider from "./EditControl/DividerConfig.vue";
import Pagination from "./EditControl/Pagination.vue";

export default {
    data() {
        return {
            form: {},
            color1: null,
            activeNames: ["1"],
            activeName: "first",
            data:{},
        };
    },
    components: {
        CommonConfig,
        PageConfig,
        ColorBlockConfig,
        FormConfig,
        ImgConfig,
        TextConfig,
        IconConfig,
        FormItemConfig,
        TabConfig,
        CircularConfig,
        BreadcrumbConfig,
        StatusPageConfig,
        CarouselConfig,
        Bindfield,
        Divider,
        Pagination
    },
    computed: {
        ...mapState(["showEditControl", "currentModule"])
    },
    methods: {
        ...mapMutations(["stateChange"]),
        handleChange(val) {
            //				console.log(val);
        },
        handleClose() {
            this.stateChange(["showEditControl", false]);
        }
    }
};
</script>
<style lang="less">
.editControl-box {
    .el-drawer__body {
        padding: 0 10px;
    }
    .el-drawer.ltr,
    .el-drawer.rtl,
    .el-drawer__container {
        top: 0;
        bottom: 0;
        min-height: 100%;
        height: auto !important;
        overflow: auto;
    }
    .el-collapse-item {
        border-bottom: 1px solid #ebeef5;
    }
}
</style>
<style lang="less" scoped>
.form_box {
    .form_box_item {
        margin-bottom: 20px;
        display: flex;
        // justify-content: center;
        align-items: center;
        & > span {
            display: inline-block;
            width: 100px;
            text-align: left;
        }
    }
}
</style>
