<template>
    <div class="screen-box-container">
        <div class="tag-row" v-for="(item,index) in tagList" :key="item.tagName">
            <span class="tagType">{{item.tagName}} : </span>
            <!-- 上线时间 -->
            <ul class="tag-container" v-if="item.tagList" >
                <li v-for="tag in item.tagList" :key="item.tag_name + '_'+tag.tag_id" 
                    :class="{'choosed': (nav == 1 && d_chooseList.indexOf(tag.tag_value) > -1) || (nav == 2 && e_chooseList.indexOf(tag.tag_value) > -1) }"
                    @click="chooseTag(tag,item.type)">
                    {{tag.tag_name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                d_chooseList: [],
                e_chooseList: []
            }
        },
        computed: {
            ...mapState({
                'digitalTags' : state => state.digitalTags,
                'exchangeTags' : state => state.exchangeTags
            })
        },
        props: {
            nav: {
                type: Number,
                default: 1
            },
            tagList: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        methods:{
            chooseTag(el,type){
                let tag_value = el.tag_value;
                let temp_value = [];
                // 区分key
                let storeKey = "";
                let storeObject = {};

                if(this.nav == 1){
                    storeKey = "updateDigitalTag";
                    storeObject = this.digitalTags[type];
                }else{
                    storeKey = "updateExchangeTag";
                    storeObject = this.exchangeTags[type];
                }
                // 更新 vuex store
                if(storeObject){
                    temp_value = storeObject.slice();
                }
                // 去重
                if(temp_value.indexOf(tag_value) < 0){
                    temp_value.push(tag_value);
                }else{
                    let last_index = -1;
                    for (let i = 0; i < temp_value.length; i++) {
                        if(temp_value[i] == tag_value){
                            last_index = i;
                        }
                    }
                    temp_value.splice(last_index,1);
                }
                this.$store.commit(storeKey,{
                    key: type,
                    value: temp_value
                })
                // 展示
                let _this = this;
                if(this.nav == 1){
                    if(this.d_chooseList.indexOf(tag_value) < 0){
                        this.d_chooseList.push(tag_value);
                        this.d_chooseList.push(tag_value);
                    }else{
                        let last_index = -1;
                        for (let i = 0; i < _this.d_chooseList.length; i++) {
                            if(_this.d_chooseList[i] == tag_value){
                                last_index = i;
                            }
                        }
                        last_index > 0 && this.d_chooseList.splice(last_index,1)
                    }
                }else{
                    if(this.e_chooseList.indexOf(tag_value) < 0){
                        this.e_chooseList.push(tag_value);
                    }else{
                        let last_index = -1;
                        for (let i = 0; i < _this.e_chooseList.length; i++) {
                            if(_this.e_chooseList[i] == tag_value){
                                last_index = i;
                            }
                        }
                        last_index > 0 && this.e_chooseList.splice(last_index,1)
                    }
                    
                }
                this.$emit('chooseTag',tag_value,type);
            }
        }

    }
</script>

<style scoped lang="scss">
    .screen-box-container {
        padding: 30px;
        font-size: 14px;
        color: #333333;
        font-weight: 300;
        .tag-row {
            width: 100%;
            margin: 10px 0;
            display: flex;
            .tagType {
                width: 80px;
                line-height: 30px;
                text-align: right;
                font-family: PingFangSC-Semibold;
                font-size: 12px;
                font-weight: bold;
                margin-right: 8px;
                white-space: nowrap;
            }
            .tag-container{
                flex: 1;
                li{
                    display: inline-block;
                    padding: 6px 13px;
                    background: #F5F5F5;
                    border-radius: 17px;
                    text-align: center;
                    margin: 0 7px 10px 7px;
                    &.choosed{
                        border: 1px solid #FD5A22;
                        color: #FD5A22;
                        background: white;
                    }
                    &:hover{
                        cursor: pointer;
                    }
                }

            }
        }
    }
</style>