<template>
    <div v-if="showNotice" class="notice-bar">
        <ul ref="scrollList" :style="{'transform': 'translateY(-'+velocityY+'px)'}">
            <li v-for="(notice,index) in noticeList" :key="index">
                <img class="icon-notice" src="../assets/notice-icon.png" />
                {{notice}}
                <span class="got-btn" v-if="noticeList.length == 1" @click="removeNotice">我知道了</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showNotice: true,
                noticeList: ['公告：火币研究院院长 水长流、 币安实验室安全中心主任 王不安 已入驻**平台~','test tststestsetetest tststestsetetest tststestsete','埃菲尔发嗯发违法而我发啊但是发说说','4444','55555'],
                scrollVelocity: 4,                // 滚动间隔 (s)
                st: 0,                              // serInterval id
                velocityY: 0,                       // Y 轴位移
            }
        },
        created(){
            this.handleScroll();
            this.$store.commit('updateHasNotice',this.noticeList.length > 1)
        },
        mounted(){

        },
        methods:{
            handleScroll(){
                let _this = this;
                let count = 0;
                if(this.noticeList.length > 1){
                    this.st = setInterval(function(){
                        _this.velocityY = 36 * count;
                        count++;
                        if(count == _this.noticeList.length){
                            clearInterval(_this.st);
                            // _this.handleScroll()
                        }
                    },this.scrollVelocity * 1000)
                }
            },
            removeNotice(){
                this.showNotice = false;
                this.$store.commit('updateHasNotice',false)
            }
        }
    }
</script>

<style scoped lang="scss">
    .notice-bar{
        padding: 0 120px;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        color: #999999;
        background: #282633;
        
        overflow: hidden;
        ul{
            z-index: 1;
            transform: translateZ(0);
            backface-visibility: hidden;
            transition: .5s ease-out;
            li{
                height: 36px;
                .icon-notice{
                    display: inline-block;
                    vertical-align: middle;
                    margin: -3px 5px 0 10px;
                    width: 14px;
                    height: 14px;
                }
                .got-btn{
                    margin-left: 20px;
                    padding: 2px 16px;
                    height: 26px;
                    line-height: 26px;
                    border: 1px solid #999999;
                    border-radius: 15px;
                    text-align: center;
                }
            }
        }
    }
</style>