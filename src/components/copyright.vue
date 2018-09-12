<template>
    <div class="copyright-wrapper">
        <p class="copyright">Copyright © 2018 LOGO  京ICP备13040123号</p>
        <span>关于我们</span><span>联系我们</span>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">
    .copyright-wrapper{
        width: 100%;
        text-align: center;
        height: 68px;
        line-height: 68px;
        background: rgba(25,23,40,0.9);
        color: white;
        transform: translateZ(0);
        backface-visibility: hidden;
        z-index: 1;
        .copyright{
            font-size: 14px;
            color: rgba(153,153,153,1);
        }
        p,span{
            display: inline-block;
            position: relative;
        }
        p{
            padding: 0 20px;
        }
        span{
            margin-right: 10px;
        }
        span:last-child{
            &:before{
                content: "";
                position: absolute;
                top: 30px;
                left: -5px;
                height: 10px;
                background: rgba(255,255,255,0.5);
                width: 1px;
            }
        }
    }
</style>