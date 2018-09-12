<template>
    <div class="route-wrapper">
        <div v-for="(item,index) in info" :key="item.key" class="map-route">
            <div class="info-window" :class="{'left':(index + 1) % 2 != 0,'right': (index + 1) % 2 == 0}">
                <h1>{{item.date}}</h1>
                {{item.desc}}
            </div>
            <div class="red-point"></div>
            <div v-if="index < info.length - 1" class="route-line"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            info: {
                type: Array,
                default(){
                    return [];
                } 
            },
        },
    }
</script>

<style scoped lang="scss">
    .route-wrapper{
        position: relative;
        width: 100%;
        margin: 30px 0;
        padding-bottom: 30px;
        .map-route{
            position: relative;
            .red-point{
                left: 50%;
                position: relative;
                width: 10px;
                height: 10px;
                border-radius: 100%;
                background: #FD5A22;
                margin-left: -3px;
            }

            .route-line{
                left: 50%;
                position: relative;
                width: 3px;
                height: 30px;
                margin: 6px 0;
                background: #E5E5E5;
            }
        }
        .info-window{
            position: absolute;
            width: 300px;
            background: #FFFFFF;
            border: 1px solid #EDEDED;
            box-shadow: 0 0 5px 0 rgba(0,0,0,0.10);
            padding: 10px 15px;
            border-radius: 4px;
            font-size: 12px;
            color: #666666;
            line-height: 1.4;
            &:after{
                content: "";
                position: absolute;
                top: 10px;
                right: -15px;
                width: 15px;
                height: 15px;
                background: url(../../assets/round-arrow.png) no-repeat;
                background-size: 100% 100%;
            }
            &.left{
                left: 75px;
                top: -15px;
            }
            &.right{
                right: 75px;
                top: -15px;
                &:after{
                    right: 0;
                    left: -15px;
                    transform: scale(-1);
                }
            }
            h1{
                font-size: 14px;
                color: #FD5A22;
                font-weight: bold;
                margin-bottom: 5px;
            }

        }
    }
</style>