<template>
	<div class="box">
		<div class="logo-box">
			<img width="100px" src="https://img.xl-ai.com/mtk/1585531748774.png" alt="img">
		</div>
		<div class="btn-box">
			  <!-- <el-button type="primary">全屏编辑</el-button> -->
			  <el-button type="primary" @click="goPreview">预览</el-button>
			  <el-button type="primary">保存</el-button>
			  <el-button type="primary" @click="clear">清空</el-button>
		</div>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
	data() {
		return {
			activeIndex: '1',
		};
	},
	methods: {
		...mapMutations([
			"templateDataClear"
		]),
		goPreview(){
			let routeData = this.$router.resolve("/preview");
			window.open(routeData.href, '_blank')
		},
		clear(){
			this.templateDataClear();
			sessionStorage.clear();
			localStorage.clear();
		}
	}
};
</script>

<style lang="less" scoped>
.box{
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 10;
	height: @editTop;
	color: #fff;
	border-bottom: 1px solid @editBorderColor;
	background: #fff;
	.logo-box{
		margin-left: 30px;
		display: flex;
		align-items: center;
	}
	.btn-box{
		margin-right: 30px;
	}
}
</style>
