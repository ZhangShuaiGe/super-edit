<template>
  <div>
    <el-form
      :action="currentTemplateDate.url"
      ref="form"
      :model="form"
      label-width="100px"
      :draggable="isEdit"
      @drag.native.stop="drag($event)"
      @dragstart.native.stop="dragStart($event,currentTemplateDate)"
      @click.native.stop="showEdit"
      :style="{...styleObject}"
      :inline="false"
      :rules="rules"
    >
      <el-form-item
        class="itemsform"
        v-for="(val,key) in currentTemplateDate.children"
        :label="val.label"
        @click.native.stop="clitem(val,key)"
        :style="{
          position:'absolute',
          top:val.y + 'px',
          left:val.x +'px'
        }"
        :key="key"
        :draggable="isEdit"
        @drag.native.stop="drag($event)"
        @dragstart.native.stop="dragStart($event,val,key)"
        :prop="val.name"
      >
          <i v-if="isEdit" class="el-icon-delete del-icon" @click.prevent.stop="delself(val,key)"></i>
          <!-- 单行文本框 -->
          <el-input
            v-if="val.elementType == 'input'"
            v-model="form[val.name]"
            :placeholder="val.placeholder"
            :name="val.name">
          </el-input>
          <!-- 单选下拉框 -->
          <el-select filterable
            v-if="val.elementType == 'select'"
            v-model="form[val.name]"
            :placeholder="val.placeholder"
            :name="val.name"
          >
              <el-option
                v-for="(option,index) in val.children"
                :placeholder="val.placeholder"
                :value="option.value"
                :label="option.label"
                :key="index"></el-option>
          </el-select>
          <!-- 多行文本框 -->
          <el-input
            v-model="form[val.name]"
            v-if="val.elementType == 'textArear'"
            :placeholder="val.placeholder"
            type="textarea"
            :name="val.name"
          >
          </el-input>
          <!-- 评分 -->
          <el-rate
             v-model="form[val.name]"
            v-if="val.elementType == 'Rate'"
            :placeholder="val.placeholder"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
          <!-- 日期选择 -->
          <el-date-picker
            v-model="form[val.name]"
            v-if="val.elementType == 'date'"
            type="date"
            :placeholder="val.placeholder"
            style="width: 100%;"
            :name="val.name"
            format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <!-- 开关按钮 -->
          <el-switch
            v-if="val.elementType == 'switch'"
            v-model="form[val.name]"
            :name="val.name"
          >
          </el-switch>
           <!-- InputNumber 计数器 -->
        <el-input-number v-model="form[val.name]" v-if="val.elementType == 'InputNumber'" ></el-input-number>
          <!-- 多选下拉框 -->
          <el-select multiple
            v-if="val.elementType == 'checkbox'"
            v-model="form[val.name]"
            :placeholder="val.placeholder"
            :name="val.name"
          >
              <el-option
                v-for="(option,index) in val.children"
                :placeholder="val.placeholder"
                :value="option.value"
                :key="index"></el-option>
          </el-select>

          <!-- <el-checkbox-group  
            v-if="val.elementType == 'checkbox'"
            v-model="form[val.name]"
          >
              <el-checkbox
                v-for="(option,index) in val.children"
                :key="index"
                :label="option.label"
              >{{option.value}}</el-checkbox>
          </el-checkbox-group> -->
          
          <!-- 单选radio -->
          <el-radio-group
            v-if="val.elementType == 'radio'"
            v-model="form[val.name]"
            :name="val.name"
          >
              <el-radio
                v-for="(option,index) in val.children"
                :value="option.value"
                :key="index"
                :label="option.label"
              ></el-radio>
          </el-radio-group>
          
          <!-- 级联选择 -->
          <el-cascader v-if="val.elementType == 'Cascader'"
             v-model="form[val.name]"
            :options="val.children"
            ></el-cascader>
            

          <!-- 文件上传组件 -->
          <!--:show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload" -->
             <div v-if="val.elementType == 'Upload'">
               <div class="fileupload">
                 <el-button type="primary" size="small">选择文件</el-button>
                 <input type="file" class="typefile" >
                 <ul class="el-upload-list el-upload-list--text">
                   <li tabindex="0" class="el-upload-list__item is-success">
                    <a class="el-upload-list__item-name"><i class="el-icon-document"></i>food.jpegfood.jpegfood.jpegfood.jpegfood.jpegfood.jpegfood.jpeg</a>
                    <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-circle-check"></i></label>
                    <i class="el-icon-close"></i>
                   </li>
                  </ul>
               </div>
                
             </div>
              <div class="mask" v-if="isEdit"></div>
      </el-form-item>
     
      <span  v-for="(val,key) in currentTemplateDate.children" :key="key+'button'" >
        <!-- 提交按钮 -->
        <el-button  v-if="val.elementType=='button'"
        :style="{ 
          position:'absolute',
          top:val.y + 'px',
          left:val.x +'px'
        }"
        :draggable="isEdit"
        @drag.native.stop="drag($event)"
        @dragstart.native.stop="dragStart($event,val,key)" type="primary" @click="onSubmit">立即创建</el-button>
      </span>
        

    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	data() {
		return {
			form: {},
			rules: {},
		};
	},
	props: ["currentTemplateDate", "templateName", "styleObject"],
	created() {
		let formNmaes = JSON.parse(JSON.stringify(this.currentTemplateDate.children));
		for (let i = 0; i < formNmaes.length; i++) {
			this.form[formNmaes[i].name];

			if (formNmaes[i].elementType == "button") {
				continue;
			}
			this.rules[formNmaes[i].name] = [];
			if (formNmaes[i].config.required) {
				this.rules[formNmaes[i].name] = [
					{ required: true, message: `此项为必填项`, trigger: "change" },
				];
			}
			if (formNmaes[i].config.regexp) {
				this.rules[formNmaes[i].name].push({
					validator: (rule, value, callback) => {
						let regExp = new RegExp(formNmaes[i].config.regexp);
						if (regExp.test(value) === false) {
							callback(new Error(`${formNmaes[i].label}格式不正确`));
						} else {
							callback();
						}
					},
					trigger: "change",
				});
			}
		}
		
  },
  
  computed:{
      ...mapState([
          "showEditControl",
      ]),
  },

	methods: {
		...mapMutations(["templateDataModule", "stateChange"]),

		onSubmit() {
			console.log(this.form);
			this.$refs["form"].validate((valid) => {
				if (valid) {
					// alert('submit!');
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		delself(obj, key) {
			let curobj =JSON.parse(JSON.stringify(this.currentTemplateDate));
			curobj.children.splice(key, 1);
			this.$store.commit("stateChange", ["currentTemplateData", curobj]);
			this.$store.commit("stateChange", ["currentModule", this.templateName]);
    },
    clitem(val,key){
      let curdata=JSON.parse(JSON.stringify(this.currentTemplateDate));
      for(let i=0;i<curdata.children.length;i++){
         curdata.children[i].isHide=true;
         if(i==key){
           delete curdata.children[i].isHide
         }
      };
      this.stateChange(["currentTemplateData", curdata]);
      this.stateChange(["currentModule", this.templateName]);
      this.stateChange(["showEditControl", true]);
    },

  },
  watch:{
    showEditControl(ne,ol){
      if(!ne){
         let curdata=JSON.parse(JSON.stringify(this.currentTemplateDate));
        for(let i=0;i<curdata.children.length;i++){
          delete curdata.children[i].isHide
        };
         this.stateChange(["currentModule", this.templateName]);
        this.stateChange(["currentTemplateData", curdata]);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 90;
    }

.del-icon {
	position: absolute;
	top: 10px;
	right: 0px;
	display: none;
	z-index: 99;
	font-size: 20px;
	color: red;
	cursor: pointer;
	background: #fff;
}

.itemsform:hover .del-icon {
	display: block;
}
.itemsform {
	width: 310px;
}

.fileupload {
	position: relative;
	.typefile {
		position: absolute;
		display: block;
		width: 80px;
		height: 32px;
		overflow: hidden;
		opacity: 0;
		top: 0px;
		left: 0;
	}
}
</style>

<style lang="less">
.el-rate__icon {
	line-height: 40px;
}
</style>
