<template>
    <div>
        <div v-for="(val,key) in templateData.module"
             :key="key"
        >
            <div v-if="!templateData.config[val].parentmodelobj">
                <component
                        :is="val"
                        :templateName="val"
                        :currentTemplateDate="templateData.config[val]"
                        :styleObject="{
							 position:'absolute',
							 zIndex:templateData.config[val].zIndex,
							 width:templateData.config[val].width?templateData.config[val].width + 'px' : 'auto',
							 height:templateData.config[val].height?templateData.config[val].height + 'px' : 'auto',
							 color:templateData.config[val].color?templateData.config[val].color : '',
							 left:templateData.config[val].x+'px',
							 top:templateData.config[val].y+'px',
							 background:templateData.config[val].background,
							 fontSize:templateData.config[val].fontSize + 'px',
							 opacity:(templateData.config[val].opacity||templateData.config[val].opacity==0?templateData.config[val].opacity/100:templateData.config[val].opacity = 100) ,
							 transform:`rotate(${templateData.config[val].rotate}deg)`,
				}"
                >
                </component>
            </div>
        </div>

        <div v-show="false">
            {{JSON.stringify(currentTemplateData)}}
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import webData from "@/template/template.config.js";
    import {mapState, mapGetters, mapMutations} from "vuex";
    export default {
        data () {
            return {

            }
        },
        watch: {
            getModule(e) {
                this.loading();
            },
            currentTemplateData: {
                handler: function (val) {
                    this.templateDataConfig({
                        templateName: this.currentModule,
                        currentTemplateDate: val,
                    });
                },
                deep: true,
                immediate: true,
            },
        },
        computed: {
            ...mapGetters(["getModule"]),
            ...mapState([
                "templateData",
                "currentTemplateData",
                "currentModule",
                "dragModel",
                "dragObj",
            ]),
        },
        methods:{
            ...mapMutations(["templateDataConfig"]),
            loading() {
                if (this.templateData.module) {
                    this.templateData.module.map((val, key) => {
                        let templateName = val.split("_")[0];
                        return Vue.component(
                                val,
                                require(`@/template/${templateName}/${templateName}.vue`).default
                        );
                    });
                }
            },
        },
        created() {
            this.loading();
        },
    }
</script>

<style lang="less" scoped>

</style>
