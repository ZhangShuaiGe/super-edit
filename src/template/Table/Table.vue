<template>
	<div>
		<div
		:draggable="isEdit"
		@drag.stop="drag($event)"
		@dragstart.stop="dragStart($event,currentTemplateDate)"
		@click.stop="showEdit"
		:style="{...styleObject}"
		>
			<el-table
			  :data="tableData"
			  style="width: 100%">
			  <el-table-column
			    prop="date"
			    label="日期"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="name"
			    label="姓名"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="address"
			    label="地址">
			  </el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed:{
		...mapState([
			"templateData",
		])
	},
	data(){
		return{
		   tableData: [{
			  date: '2016-05-02',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  date: '2016-05-04',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1517 弄'
			}, {
			  date: '2016-05-01',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1519 弄'
			}, {
			  date: '2016-05-03',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1516 弄'
			}]
		}
	},
	props:["currentTemplateDate","templateName","styleObject"],
}
</script>

<style lang="less" scoped>
	table{
		position: absolute;
		border: 1px solid #ccc;
		td{
			border: 1px solid #ccc;
		}
	}
</style>
