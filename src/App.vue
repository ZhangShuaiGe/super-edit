<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
	<!-- <newPage /> -->
	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="less">
*{
	margin: 0;
	padding: 0;
}
.ui-position{
	position: absolute;
}
.editBox{
    border:2px solid #409EFF!important;
}
.form_box{
    .form_box_item{
        margin-bottom: 20px;
        display: flex;
        // justify-content: center;
        align-items: center;
        &>span{
            display: inline-block;
            width: 100px;
            text-align: left;
        }
    }
}
</style>
