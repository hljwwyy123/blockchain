<template>
    <div class="material-wrapper">
        <h1>{{hotType}}</h1>
        <ul>
            <li v-for="(item,index) in list" :key="'hot_list_'+index">
                <img v-if="item.img" :src="item.img" alt="logo" />
                <b>{{item.name}}</b>
                <span>{{item.sign_num}}人买过</span>
                <el-popover
                    width="120"
                    placement="left"
                    ref="hot_mark_pop"
                    trigger="click">
                    <ul class="mark-list">
                        <li v-for="mark in markList" @click="chooseMark(item,mark,index)">{{mark}}</li>
                    </ul>
                    <el-button slot="reference"  class="mark-btn">{{item.is_sign ? item.is_sign : '标记买过'}}</el-button>
                </el-popover>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            hotType:{
                type: String,
                default: ''
            },
            navCategoryId:{
                type: Number,
                default: 1
            },
            list: {
                type: Array,
                default(){
                    return []
                }
            },
            markList:{
                type: Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            chooseMark(el,mark,index){
                document.querySelector("body").click();
                let url = el.is_sign ? '/api/sign/up' : '/api/sign/mark';
                let _this = this;
                this.$ajax.get(this.AJAX_BASEURL + url,
                    {nav_category_id: el.nav_category_id, theme_id:el.theme_id, sign_info: mark})
                    .then((res) => {
                        if(res.errno){
                            alert(res.errmsg);
                        } else {
                            _this.$emit('updateMark')
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
.material-wrapper{
    width: 260px;
    padding: 10px;
    margin-bottom: 30px;
    background: #FFFFFF;
    box-shadow: 0 5px 5px 0 rgba(0,0,0,0.06);
    border-radius: 4px;
    font-size: 12px;
    color: #333333;
    h1{
        position: relative;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        margin: 13px 10px 18px 10px;
        &:before{
            content: '';
            position: absolute;
            top: 5px;
            left: -10px;
            width: 4px;
            height: 18px;
            background: #FD5A22;
        }
    }
    ul{
        width: 100%;
        margin-bottom: 15px;
        li{
            position: relative;
            width: 98%;
            margin: auto;
            height: 80px;
            border-bottom: 1px solid #EEEEEE;
            font-size: 12px;
            color: #333333;
            text-align: center;
            line-height: 1.4;
            text-align: left;
            word-break: break-all;
            &:last-child{
                border-bottom:none 0;
            }
            img{
                float: left;
                width: 50px;
                height: 50px;;
                border-radius: 50%;
                margin: 15px 10px 0 10px;
            }
            b{
                position: absolute;
                top: 18px;
                left: 70px;
                max-width: 105px;
                margin-bottom: 5px;
                font-family: PingFangSC-Semibold;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                
            }
            span{
                position: absolute;
                bottom: 15px;
                left: 70px;
                font-family: PingFangSC-Light;
            }
            .mark-btn{
                position: absolute;
                right: -175px;
                top: -30px;
                border: 1px solid #FD5A22;
                padding: 3px 11px;
                font-weight: 300;
                font-size: 12px;
                color: #FD5A22;
                text-align: center;
                height: 22px;
                border-radius: 20px;
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
        &:hover{
            background: #EEEEEE;
            font-weight: bold;
        }
        &:last-child{
            border-bottom: none 0;
        }
    }
}
</style>