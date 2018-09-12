<template>
    <div class="material-wrapper">
        <h1>相关资料</h1>
        <ul>
            <li v-for="(item,index) in attrList" :key="'m_list_'+index">
                <b>{{item.key}}</b>
                <span v-if="item.value.indexOf('http') < 0" >{{item.value}}</span>
                <a v-if="item.value.indexOf('http') > -1" :href="item.value" target="_blank">{{item.value}}</a>                    
            </li>
        </ul>
        <a :href="tradeSite" target="_blank" class="buy-btn">去交易</a>
    </div>
</template>

<script>
    export default {
        props: {
            attrList: {
                type: Array,
                default(){
                    return []
                }
            },
            tradeSite: {
                type: String,
                default: ''
            }
        },
        filters:{
            
        },
        methods:{

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
        background: #F7F7F7;
        margin-bottom: 15px;
        li{
            width: 98%;
            margin: auto;
            height: 48px;
            line-height: 48px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:nth-child(even){
                background: white;
            }
            b{
                width: 50px;
                text-align: left;
                display: inline-block;
                margin-left: 10px;
                margin-right: 15px;
            }
            a{
                color:#2266FF;
            }
        }
    }
    .buy-btn{
        display: block;
        background-image: linear-gradient(-218deg, #FF9347 0%, #FD5A22 100%);
        border-radius: 25px;
        text-align: center;
        width: 110px;
        height: 36px;
        line-height: 36px;
        color: white;
        margin: auto;
        &:hover{
            cursor: pointer;
        }
    }
}
</style>