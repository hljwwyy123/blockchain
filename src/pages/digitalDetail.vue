<template>
    <div class="detail-wrapper">
        <detail-head :info="headInfo" :navCategoryId="1" :markList="markList" @updateMark="updateBaseMark"></detail-head>
        <div class="content-container clearFix">
            <div class="content-body fl">
                <div v-if="contentInfo.desc_desc">
                    <h1>简介</h1>
                    <div class="text-content" v-html="contentInfo.desc_desc"></div>
                </div>
                <div v-if="contentInfo.desc_team">
                    <h1>团队介绍</h1>
                    <div class="text-content" v-html="contentInfo.desc_team"></div>
                </div>
                <div v-if="contentInfo.desc_public_info">
                    <h1>公募信息</h1>
                    <div class="placement-table-container">
                        <div class="placement-table">
                            <div class="p-row">
                                <div class="p-cell">
                                    <p><label>公募时间：</label><span>{{contentInfo.desc_public_info.time}}</span></p>
                                </div>
                                <div class="p-cell">
                                    <p><label>ICO成本：</label><span>{{contentInfo.desc_public_info.ico}}</span></p>
                                </div>
                            </div>
                            <div class="p-row">
                                <div class="p-cell">
                                    <p><label>募集资金：</label><span>{{contentInfo.desc_public_info.count}}</span></p>
                                </div>
                                <div class="p-cell">
                                    <p><label>代币分配：</label><span>{{contentInfo.desc_public_info.distribute}}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="contentInfo.desc_road_map">
                    <h1>路线图</h1>
                    <route-map :info="contentInfo.desc_road_map"></route-map>
                </div>
            </div>
            <div class="sub-content fr">
                <material v-if="attrInfo.length > 0" :attrList="attrInfo" :tradeSite="headInfo.trade_site"></material>
                <hot v-if="hotList.length > 0" :list="hotList" :markList="markList" @updateMark="getHotMarkList" :hotType="'热门数字货币'" :navCategoryId="1"></hot>
            </div>
        </div>
    </div>
</template>

<script>
    import detailHead from "@/components/detail/detailHead"
    import material from "@/components/detail/material"
    import hot from "@/components/detail/hot"
    import routeMap from "@/components/detail/routeMap"

    export default {
        data() {
            return {
                nav_category_id: 1,
                headInfo: {},               // 头部信息
                contentInfo: {},            // 简介 & 团队介绍
                attrInfo:[],                // 相关信息 
                hotList:[],                 // 热门币 
                markList: [],               // mark 列表 [赚大了，血亏了]
                tradeSite: ''              // 交易url
            }
        },
        created(){
            let themeid = this.$route.params.themeid
            let _this = this;
            this.$ajax.get(this.AJAX_BASEURL + '/api/theme/info',{nav_category_id: this.nav_category_id,theme_id: themeid})
                .then((res) => {    
                    _this.headInfo = res.data.baseInfo;
                    _this.attrInfo = res.data.attribute_info;
                    _this.contentInfo.desc_public_info = res.data.desc_public_info;
                    _this.contentInfo.desc_road_map  = res.data.desc_road_map;
                    _this.contentInfo.desc_desc = res.data.desc_desc;
                    _this.contentInfo.desc_team = res.data.desc_team;
                    
                })
                .catch((e)=>{
                    
                });
            this.getHotList();
            this.getHotMarkList();
        },
        methods: {
            getHotMarkList(){
                let _this = this;
                if(this.markList.length <= 0){
                    this.$ajax.get(this.AJAX_BASEURL+ '/api/sign/signInfo',{nav_category_id: this.nav_category_id})
                        .then((res)=>{
                            _this.markList = res.data;
                        })
                        .catch((e)=>{
    
                        })
                }
            },
            getHotList(){
                this.$ajax.get(this.AJAX_BASEURL + '/api/theme/hot',{nav_category_id: this.nav_category_id})
                .then((res) => {    
                    _this.hotList = res.data;
                })
                .catch((e)=>{
                    
                });
            },
            updateBaseMark(el){
                this.headInfo['is_sign'] = el;
            }
        },
        components:{
            detailHead,
            material,
            hot,
            routeMap
        }
    }
</script>

<style scoped lang="scss">
.detail-wrapper{
    background: #F7F7F7;
    .content-container{
        width: 1200px;
        margin: auto;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        .content-body{
            width: 860px;
            padding: 0 20px;
            margin-right: 20px;
            margin-bottom: 20px;
            background: #FFFFFF;
            box-shadow: 0 6px 6px 0 rgba(0,0,0,0.06);
            border-radius: 4px;
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
                    top: 5px;
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
                padding: 20px 0 30px 0;
                border-bottom: 1px solid #EEEEEE;
            }
            .placement-table-container{
                margin: 20px 0 30px 0;
                padding-bottom: 30px; 
                border-bottom: 1px solid #EEEEEE;
                .placement-table{
                    border: 1px solid #EBEBEB;
                    font-size: 14px;
                    color: #333333;;
                    .p-row{
                        background: white;
                        border-bottom: 1px solid #EBEBEB;
                        &:last-child{
                            border-bottom: none 0;
                        }
                        .p-cell{
                            min-width: 340px;
                            max-width: 430px;
                            padding: 10px 20px;
                            display: inline-block;
                            &:nth-child(odd){
                                border-right: 1px solid #EBEBEB;
                            }
                            p{
                                display: flex;
                                label{
                                    width: 70px;
                                }
                                span{
                                    flex: 1 1;
                                }
                            }
                        }
                        
                        &:nth-child(even){
                            background: #F7F7F7;
                        }
                    }
                }
            }
        }
        
    }
}
</style>