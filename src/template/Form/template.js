import { v4 as uuid } from 'uuid';
export default {
	url: "https://www.baidu.com",
	x: "0",
	y: "0",
	zIndex:2,
	width: "400",
	height: "900",
	children: [{
		elementType: `input`,
		elementName:'单行输入框',
		label: "单行输入框",
		value: "",
		x: "0",
		y: "0",
		name: `input-${uuid()}`,
		placeholder:"",
		width: "200",
		height: "100",
		config: {
			required: true,
		},
	}, {
		elementType: `select`,
		elementName:'下拉选',
		label: "下拉选",
		name: `select-${uuid()}`,
		value: "",
		x: "0",
		y: "80",
		placeholder:"",
		config: {
			required: true,
		},
		children: [{
				label: "北京",
				value: "1",
			},
			{
				label: "上海",
				value: "2",
			},
		]
	}, {
		elementType: `textArear`,
		label: "多行输入框",
		elementName:'多行输入框',
		value: "",
		x: "0",
		y: "160",
		name: `textArear-${uuid()}`,
		placeholder:"",
		config: {
			required: true,
		},
	},{
		elementType: `date`,
		label: "时间选择器",
		elementName:'时间选择器',
		value: "",
		x: "0",
		y: "240",
		name: `date-${uuid()}`,
		placeholder:"",
		config: {
			required: true,
		},
	},{
		elementType: `switch`,
		elementName:'按钮开关',
		label: "按钮开关",
		value: false,
		x: "0",
		y: "320",
		name: `switch-${uuid()}`,
		placeholder:"",
		config: {
			required: true,
		},
	},{
		elementType: `checkbox`,
		elementName:'多选',
		label: "多选",
		name: `checkbox-${uuid()}`,
		value: "",
		x: "0",
		y: "400",
		placeholder:"",
		config: {
			required: true,
		},
		children: [{
				label: "北京",
				value: "1",
			},
			{
				label: "上海",
				value: "2",
			},
		]
	},{
		elementType: `radio`,
		elementName:'单选',
		label: "单选",
		name: `radio-${uuid()}`,
		value: "",
		x: "0",
		y: "480",
		placeholder:"",
		config: {
			required: true,
		},
		children: [{
				label: "北京",
				value: "1",
			},
			{
				label: "上海",
				value: "2",
			},
		]
	},
	{
		elementType: `InputNumber`,
		elementName:'计数器',
		label: "计数器",
		name: `InputNumber-${uuid()}`,
		value: "",
		x: "0",
		y: "560",
		placeholder:"",
		config: {
			required: true,
		},
	},
	{
		elementType: `Rate`,
		elementName:'评分',
		label: "评分",
		name: `Rate-${uuid()}`,
		value: "",
		x: "0",
		y: "640",
		placeholder:"",
		config: {
			required: true,
		},
	},
	{
		elementType: `Upload`,
		elementName:'上传',
		label: "上传",
		name: `Upload-${uuid()}`,
		value: "",
		x: "0",
		y: "720",
		placeholder:"",
		config: {
			required: true,
		},
	},

	{
		elementType: `Cascader`,
		elementName:'级联选择器',
		label: "级联选择器",
		name: `Cascader-${uuid()}`,
		value: "",
		x: "0",
		y: "820",
		placeholder:"",
		config: {
			required: true,
		},
		children:[ {
				value: 'ziyuan',
				label: '一级',
				children: [{
					value: 'jiaohu',
					label: '二级'
				}]
			}
		]
	},
	
	{	
		elementType: `button`,
		elementName:'按钮',
		label: "",
		value: "",
		x: "0",
		y: "900",
		name: `button-${uuid()}`,
		config: {
			required: true,
		},
	}],
}
