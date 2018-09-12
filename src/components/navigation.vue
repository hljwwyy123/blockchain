<template>
    <div class="nav-wrapper">
        <noticeBoard></noticeBoard>
        <div class="navigation">
            <img src="../assets/logo.png" class="logo" alt="logo">
            <ul class="nav">
                <li v-for="(nav,index) in navList" :class="{'active':activeNav == index}" @click="handleSelect(nav,index)" :key="'nav_'+index">
                    {{ nav.text }}
                </li>
            </ul>
            <ul class="login-box">
                <li>登录</li>
                <li>注册</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import noticeBoard from "@/components/notice-board"
    
    export default {
        data() {
            return {
                navList:[
                    {text: "导航",url:"/"},
                    {text: "我的主页", url: "/my"},
                    {text:"大V广场", url: "/bigv"},
                    {text:"游戏", url: "/game"},
                    {text:"资产", url: "/captial"},
                    ],
                activeNav: '0',
            }
        },
        methods:{
            handleSelect(el,index) {
                this.activeNav = index;
                this.$router.push(el.url)
            }
        },
        components:{
            noticeBoard,
        }
    }
</script>

<style scoped lang="scss">
    .nav-wrapper{
        display: block;
        position: fixed;
        position: relative;
        top: 0;
        width: 100%;
        background: #2F2C3C;
        z-index: 2100;
        .navigation{
            position: relative;
            padding: 0 120px;
            min-width: 960px;
            height: 68px;
            line-height: 68px;
            background: #2F2C3C;
            font-size: 16px;
            color: #FFFFFF;
            text-align: left;
            img.logo{
                display: inline-block;
                width: 110px;
                height: 28px;
                vertical-align: middle;
            }
            ul{
                display: inline-block;
                li{
                    display: inline-block;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .nav{
                li{
                    margin-right: 30px;
                    &:first-child{
                        margin-left: 40px;
                    }
                    &.active{
                        position: relative;
                        color: #FD5A22;
                        &:after{
                            content: '';
                            position: absolute;
                            display: block;
                            bottom: 0;
                            width: 100%;
                            height: 3px;
                            background: #FD5A22;
                        }
                    }
                }
            }
            .login-box{
                position: relative;
                top: 50%;
                margin-top: -18px;
                float: right;
                width: 120px;
                height: 36px;
                line-height: 36px;
                background-image: linear-gradient(90deg, #FF9347 0%, #FD5A22 100%);
                border-radius: 18px;
                font-size: 14px;
                text-align: center;
                font-weight: 300;
                li{
                    position: relative;
                    width: 40px;
                    box-sizing: border-box;
                    &:first-child{
                        &:after{
                            content: '';
                            position: absolute;
                            right: -2px;
                            top: 11px;
                            height: 16px;
                            width: 1px;
                            background: #FF5E16;
                        }
                    }
                }
            }
        }
    }
</style>