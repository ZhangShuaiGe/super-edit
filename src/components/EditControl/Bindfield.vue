<template>
    <div>
        <div>
            <div v-for="(val,index) in arr" :key="index">
                <div style="margin-bottom: 30px">
                    <span>{{val}}</span>
                    <el-button type="primary" icon="el-icon-edit">绑定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from "vuex";

    export default {
        data() {
            return {
                arr: []
            }
        },
        computed: {
            ...mapState([
                "currentTemplateData",
                "currentModule",
            ]),
            moduleflag() {
                return this.currentModule ? this.currentModule.split("_")[0] : null;
            },
        },
        created() {
            this.arr = Object.keys(this.currentTemplateData);
        }
    }
</script>

<style lang="less" scoped>
    span {
        display: inline-block;
        margin-right: 10px;
        width: 100px;
        text-align: center;
        border: 1px solid #ccc;
        padding: 10px 20px;
        border-radius: 5px;
    }
</style>
