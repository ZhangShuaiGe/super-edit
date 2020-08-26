<template>
	<div>
		<EditHeader />
		<EditAside />
		<EditContent />
		<EditControl />
	</div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import EditHeader from "@/components/EditHeader.vue";
import EditAside from "@/components/EditAside.vue";
import EditContent from "@/components/EditContent.vue";
import EditControl from "@/components/EditControl.vue";
export default {
	computed:{
		...mapState([
			"templateData",
		])
	},
	components:{
		EditHeader,
		EditAside,
		EditContent,
		EditControl
	},
	data() {
		return {

		};
	},
	methods:{
		goPreview(){
			this.$router.push("/preview");
		},
	}
};
</script>

<style lang="less" scoped>
	// .content{
	// 	margin-top: 64px;
	// 	display: flex;
	// }
</style>
