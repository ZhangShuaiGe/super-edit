<template>
	<div class="content-box">
		<Preview/>
	</div>
</template>

<script>
	import Preview from "@/pages/preview.vue";
	export default{
		data(){
			return {
				
			}
		},
		components:{
			Preview
		}
	}
</script>

<style lang="less" scoped>
	.content-box{
		border: 1px solid @editBorderColor;
		min-height: 100vh;
		width: 1200px;
		margin-top: @editTop;
		margin-left:  @editAsideWidth;
	}
</style>
