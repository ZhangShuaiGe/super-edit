// const MyPlugin  = {}
import store from '@/store/store.js';

function addClass(element, className) {
    try {
        if (!new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className)) element.className += ' ' + className;
    } catch (e) {
        console.log(e);
    }
}

function removeClass(element, className) {
    try {
        if(element.className){
            element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(?=(\\s|$))", "g"), '');
        }
    } catch (e) {
        console.log(e);
    }
}

function addRemoveButton(element, className) {
    try {
        if(element.className){
            element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(?=(\\s|$))", "g"), '');
        }
    } catch (e) {
        console.log(e);
    }
}
import $random from './random';

export default {
    install(Vue, options) {
        // 1. 添加全局方法或属性
        Vue.myGlobalMethod = function () {
            // 逻辑...
        }

        // 2. 注入组件
        Vue.mixin({
            data() {
                return {
                    isEdit: location.pathname == "/edit" ? true : false,//判断是否编辑
                    positionObj: {
                        x: '',
                        y: '',
                        l: '',
                        t: '',
                    }
                }
            },
            methods: {

                dragStart(e, val, key) {
                    this.positionObj.x = e.clientX;
                    this.positionObj.y = e.clientY;
                    //获取左部和顶部的偏移量
                    this.positionObj.l = e.target.offsetLeft;
                    this.positionObj.t = e.target.offsetTop;
                    let obj = {
                        key: key,
                        templateName: this.templateName,
                        tempdata: val
                    };

                    store.commit("stateChange", ["dragObj", Object.assign(obj, this.positionObj)]);
                    store.commit("stateChange", ["currentModule", ""]);

                    if(location.pathname == "/edit"){
                        // 添加选中状态边框
                        let getEditBox = document.querySelector(".editBox");
                        getEditBox?removeClass(getEditBox, "editBox"):null;
                        addClass(e.target, "editBox");

                        //点击空白删除选中框
                        window.addEventListener("click",function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            let getEditBox = document.querySelector(".editBox");
                            getEditBox?removeClass(getEditBox, "editBox"):null;
                        });
                    }

                },
                drag(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                },
                showEdit(e) {

                    if(location.pathname == "/edit"){
                        // 添加选中状态边框
                        let getEditBox = document.querySelector(".editBox");
                        getEditBox?removeClass(getEditBox, "editBox"):null;
                        //解决多层情况下，选中边框加在子节点上的bug
                        function queryParent(dom) {
                            if(dom.getAttribute("draggable")){
                                addClass(dom,"editBox");
                            }else{
                                queryParent(dom.parentNode)
                            }
                        }
                        if(e.target.getAttribute("draggable")){
                            addClass(e.target, "editBox");
                        }else{
                            queryParent(e.target.parentNode)
                        }
                    }


                    store.commit("stateChange", ["currentModule", this.templateName]);
                    store.commit("stateChange", ["currentTemplateData", this.currentTemplateDate]);
                    store.commit("stateChange", ["showEditControl", true]);

                }

            }
        });

        Vue.prototype.$random=$random;
    }
}