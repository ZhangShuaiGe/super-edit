<template>
	<div
	class="colorBlock"
	:draggable="isEdit"
	@drag.stop="drag($event)"
	@dragstart.stop="dragStart($event,currentTemplateDate)"
	@click.stop="showEdit"
	:style="{...styleObject}"
	>
		<!-- <div style="width: 100%;height: 100%;" ></div> -->
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:["currentTemplateDate","templateName","styleObject"],
	}
</script>

<style lang="less" scoped>

</style>
