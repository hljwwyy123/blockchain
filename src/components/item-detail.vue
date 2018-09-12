<template>
    <div class="detail-wrapper">
        <div class="detail-container">
            <div class="tag-container">
                <span v-for="tag in detail.tags" class="detail-tag">{{tag.tag_name}}</span>
            </div>
            <div v-if="detail.desc_desc">
                <h1>简介</h1>
                <div class="text-content" v-html="detail.desc_desc"></div>
            </div>
            <div v-if="detail.desc_bright_spot">
                <h1>亮点</h1>
                <div class="text-content" v-html="detail.desc_bright_spot"></div>
            </div>
            <div class="detail-footer">
                <div class="goto-detail-btn" @click="gotoDetail">查看详情</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            detail: {
                type: Object,
                default(){
                    return {}
                }
            },
            navCategoryId: {
                type: Number,
                default: 1
            },
        },
        methods:{
            gotoDetail(){
                let base_url = this.navCategoryId == 1 ? 'digital_detail' : 'exchange_detail';
                this.$router.push(`/${base_url}/${this.navCategoryId}/${this.detail.id}`)
            }
        }
    }
</script>

<style scoped lang="scss">
.detail-wrapper{
    background: #ECECEC;
    width: 100%;
    margin-top: -15px;
    box-shadow: inset 0 6px 6px -2px rgba(0,0,0,0.06);
    font-family: PingFangSC-Regular;
    .detail-container{
        padding: 30px 40px;
        .tag-container{
            .detail-tag{
                background: #FFFFFF;
                border-radius: 14px;
                font-size: 12px;
                color: #FD5A22;
                text-align: center;
                padding: 6px 8px;
                margin-right: 9px;
                margin-bottom: 7px;
            }
        }
        h1{
            position: relative;
            font-size: 16px;
            color: #333333;
            font-weight: bold;
            margin-top: 18px;
            margin-left: 10px;
            &:before{
                content: '';
                position: absolute;
                top: 3px;
                left: -10px;
                width: 4px;
                height: 18px;
                background: #FD5A22;
            }
        }
        .text-content{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            line-height: 24px;
            padding: 15px 0;
            border-bottom: 1px solid #CCCCCC;
        }
        .detail-footer{
            text-align: center;
            .goto-detail-btn{
                margin-top: 20px;
                display: inline-block;
                width: 120px;
                height: 40px;
                line-height: 40px;
                background-image: linear-gradient(-218deg, #FF9347 0%, #FD5A22 100%);
                border-radius: 20px;
                color: white;
                cursor: pointer;
                text-align: center;
            }
        }
    }
}
</style>