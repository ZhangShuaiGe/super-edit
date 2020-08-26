import { v4 as uuid } from 'uuid';
// height	走马灯的高度	string	—	—
// initial-index	初始状态激活的幻灯片的索引，从 0 开始	number	—	0
// trigger	指示器的触发方式	string	click	—
// autoplay	是否自动切换	boolean	—	true
// interval	自动切换的时间间隔，单位为毫秒	number	—	3000
// indicator-position	指示器的位置	string	outside/none	—
// arrow	切换箭头的显示时机	string	always/hover/never	hover
// type	走马灯的类型	string	card	—
// loop	是否循环显示	boolean	-	true
// direction	走马灯展示的方向	string	horizontal/vertical	horizontal
export default {
    x:0,
    y:0,
    width: "1000",
    height: "500",
    zIndex:2,
    autoplay:true,
    interval:3000,
    type:"",
    direction:"horizontal",
    children:[
        {
            href:"https://www.baidu.com",
            url:"https://img.xl-ai.com/mtk/1572246340895.jpg",
        },
        {
            href:"https://www.baidu.com",
            url:"https://img.xl-ai.com/mtk/1590649021968.jpg",
        }
    ]
}
