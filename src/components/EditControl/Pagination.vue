<template>
    <div>
        <el-collapse-item v-if="moduleflag == 'Pagination'" title="分页设置" name="3">
            <div class="form_box">
                <div class="form_box_item">
                    <span>是否有背景色：</span>
                    <el-select v-model="currentTemplateData.type" placeholder="请选择">
                        <el-option label="否" value="false"></el-option>
                        <el-option label="是" value="true"></el-option>
                    </el-select>
                </div>
                <div class="form_box_item">
                    <span>展示长度：</span>
                    <el-input v-model="currentTemplateData.pagercount"></el-input>
                </div>
                <div class="form_box_item">
                    <span>只有一页时是否隐藏：</span>
                     <el-select v-model="currentTemplateData.hide" placeholder="请选择">
                        <el-option label="否" value="false"></el-option>
                        <el-option label="是" value="true"></el-option>
                    </el-select>
                </div>
            </div>
        </el-collapse-item>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["currentTemplateData", "currentModule"]),
        moduleflag() {
            return this.currentModule ? this.currentModule.split("_")[0] : null;
        }
    }
};
</script>

<style lang="less" scoped>
</style>
