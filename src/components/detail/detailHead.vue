<template>
    <div class="head-wrapper">
        <div class="head-container clearFix">
            <img v-if="info.img" :src="info.img" class="logo" alt="logo" />
            <div class="base-info" >
                <div class="title-bar clearFix">
                    <div class="fl">{{info.name}}</div>
                    <div class="fr">
                        <span>{{navCategoryId == '1' ? '市值' : '24H成交金额'}}</span>
                        <b v-if="navCategoryId == 1">￥{{info.market_value}}</b>
                        <b v-if="navCategoryId == 2">￥{{info.per_day}}</b>
                    </div>
                </div>
                <div class="desc-bar">{{info.desc}}</div>
                <div class="tag-container">
                    <span class="tag" v-for="item in info.tags" :key="item.id">
                        {{ item.tag_name }}
                    </span>
                </div>
            </div>
            <div class="count-box">
                <b>{{info.sign_num}}</b>
                <el-popover
                    width="120"
                    placement="left"
                    ref="mark_pop"
                    trigger="click">
                    <ul class="mark-list">
                        <li v-for="mark in markList" @click="chooseMark(mark)">{{mark}}</li>
                    </ul>
                    <el-button slot="reference" class="mark-btn">{{info.is_sign ? info.is_sign : '标记买过'}}</el-button>
                </el-popover>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            navCategoryId: {
                type: Number,
                default: 1
            },
            info: {
                type: Object,
                default(){
                    return {}
                }
            },
            markList: {
                type: Array,
                default(){
                    return []
                },
            }
        },
        methods:{
            chooseMark(mark,index){
                document.querySelector("body").click();
                let url = this.info.is_sign ? '/api/sign/up' : '/api/sign/mark';
                let _this = this;
                this.$ajax.get(this.AJAX_BASEURL + url,
                    {nav_category_id: this.navCategoryId, theme_id: this.info.theme_id, sign_info: mark})
                    .then((res) => {
                        if(res.errno){
                            alert(res.errmsg);
                        } else {
                            _this.$emit('updateMark',mark)
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
.head-wrapper{
    width: 100%;
    height: 240px;
    margin-bottom: 20px;
    background-image: linear-gradient(90deg, #7918EB 0%, #3776E4 100%);
    box-shadow: 0 6px 6px 0 rgba(0,0,0,0.06);
    font-family: PingFangSC-Semibold;
    .head-container{
        width: 1200px;
        margin: auto;
        img.logo{
            float: left;
            display: block;
            width: 120px;
            height: 120px;
            border-radius: 100%;
            border: 4px solid #6987E7;
            margin-top: 50px;
        }
        .base-info{
            float: left;
            width: 718px;
            margin-left: 50px;
            .title-bar{
                width: 100%;
                font-size: 24px;
                color: #FFFFFF;
                margin-top: 38px;
                padding: 9px 0;
                font-weight: bold;
                border-bottom: 1px solid rgba(255,255,255,0.5);
                .fr{
                    span{
                        font-size: 14px;
                    }
                }
            }
            .desc-bar{
                margin: 15px 0;
                font-size: 14px;
                color: white;
                font-family: PingFangSC-Light;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            .tag-container{
                font-family: PingFangSC-Light;
                span.tag{
                    padding: 5px 8px;
                    color: white;
                    font-size: 12px;
                    border: 1px solid #FFFFFF;
                    border-radius: 14px;
                    margin-right: 10px;
                }
            }
        }
        .count-box{
            float: right;
            width: 280px;
            height: 190px;
            background: rgba(0,0,0,0.2);
            margin-top: 20px;
            text-align: center;
            b{
                position: relative;
                display: block;
                margin-top:30px;
                width: 100%;
                line-height: 45px;
                font-family: PingFangSC-Semibold;
                font-size: 32px;
                color: #FFFFFF;
                &:after{
                    content: "人买过";
                    position: absolute;
                    left: 0;
                    bottom: -30px;
                    font-size: 12px;
                    width: 100%;
                    text-align: center;
                    font-family: PingFangSC-Regular;
                }
            }
            
            .mark-btn{
                display: inline-block;
                margin-top: 35px;
                width: 150px;
                height: 46px;
                line-height: 46px;
                background-image: linear-gradient(-218deg, #FF9347 0%, #FD5A22 100%);
                box-shadow: 0 4px 10px 0 rgba(0,0,0,0.20);
                border-radius: 25px;
                border: none 0;
                padding: 0;
                color: white;
                font-size: 16px;
                &:hover{
                    cursor: pointer;
                }
            }
            

        }
    }
}
.mark-list{
    background: white;
    padding: 2px;
    li{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #EEEEEE;
        border-radius: 3px;
        font-size: 12px;
        color: #333333;
        text-align: center;
        padding: 2px 0;
        &:last-child{
            border-bottom:none 0;
        }
        &:hover{
            background: #EEEEEE;
            font-weight: bold;
        }
    }
}
</style>
<style>
.el-popover {
    padding: 0;
}
</style>
