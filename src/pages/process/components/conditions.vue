<template>
    <div>
        <div v-for="(item,key) in list" :key="key" style="margin-bottom: 20px">
            <el-select style="margin-right: 10px" v-for="(item2,index) in item.col" :key="index" v-model="item2.value" placeholder="请选择">
                <el-option
                        v-for="item3 in options"
                        :key="item3.value"
                        :label="item3.label"
                        :value="item3.value">
                </el-option>
            </el-select>
            <el-button style="margin-left:30px" @click="remove(key)" type="danger" icon="el-icon-delete" circle></el-button>
        </div>
        <div style="margin-top: 20px">
            <el-button type="primary" @click.native="add">添加</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                list:[
                    {
                        col: [
                            {
                                value: "",
                            },
                            {
                                value2: "",
                            },
                            {
                                value3: "",
                            }
                        ]
                    },
                    {
                        col: [
                            {
                                value: "",
                            },
                            {
                                value2: "",
                            },
                            {
                                value3: "",
                            }
                        ]
                    }

                ],

            }
        },
        methods: {
            add() {
                this.list.push({
                    col: [
                        {
                            value: "",
                        },
                        {
                            value2: "",
                        },
                        {
                            value3: "",
                        }
                    ]
                })
            },
            remove(key){
                this.list.splice(key,1);
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
