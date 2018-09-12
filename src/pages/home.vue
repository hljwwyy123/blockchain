<template>
    <div class="home-wapper">
        <div class="head">
            <div class="tab-container">
                <span class="tab"  :class="{'active': activeTab == 1}"  @click="toggleSupperTab(1)">
                    <i class="digital"></i>数字货币
                </span>
                <span class="tab"  :class="{'active': activeTab == 2}"  @click="toggleSupperTab(2)">
                    <i class="exchange"></i>交易所
                </span>
            </div>
        </div>
        <div class="screen-box-parent" :class="{'active-digital': activeTab == 1,'active-exchange': activeTab == 2}">
            <!-- 数字货币筛选 box -->
            <screenBox v-if="activeTab == 1" :nav="activeTab" :tagList="digitalTagList" @chooseTag="onChooseTag" ></screenBox>
            <!-- 交易所筛选 box -->
            <screenBox v-if="activeTab == 2" :nav="activeTab" :tagList="exchangeTagList" @chooseTag="onChooseTag" ></screenBox>
        </div>
        <div class="table-container">
            <!-- 数字货币 -->
            <el-table v-if="activeTab == 1"
                    :data="digitalDataList"
                    row-class-name="home-list-row"
                    ref="digitalTable"
                    style="width: 1200px;margin:auto; background:#F7F7F7;"
                    >
                <el-table-column
                    prop="id"
                    type="index"
                    label="序号"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="image"
                    width="60">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="el-digital-logo"></i>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="币种"
                    class-name="digital-cell"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="release_time"
                    label="发行时间"
                    sortable
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="market_value"
                    label="总市值"
                    sortable
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="price_CNY"
                    label="币价"
                    sortable
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="sign_num"
                    label="买过的人数"
                    sortable
                    width="140">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="250">
                    <template slot-scope="scope">
                        <el-popover
                            width="120"
                            placement="left"
                            ref="mark_pop"
                            trigger="click">
                            <ul class="mark-list">
                                <li v-for="mark in digital_markList" @click="chooseMark(scope.row,mark)">{{mark}}</li>
                            </ul>
                            <el-button slot="reference" class="cell-btn">{{scope.row.is_sign ? scope.row.is_sign : '标记买过'}}</el-button>
                        </el-popover>
                        <div class="cell-btn" @click="handleCheckDetial(scope.row)">查看详情</div>
                    </template>
                </el-table-column>
                <el-table-column
                    type="expand"
                    class-name="expand-cell"
                    width="40">
                    <template slot-scope="scope">
                        <itemDetail :detail="scope.row" :navCategoryId="activeTab"></itemDetail>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 交易所 -->
            <el-table
                    v-if="activeTab == 2"
                    :data="exchangeDataList"
                    style="width: 100%"
                    ref="exchangeTable"
                    :default-sort = "{prop: 'date', order: 'descending'}" >
                >
            </el-table>
            <div class="load-more-bar"><i class="el-icon-arrow-down"></i>{{loadMoreText}}</div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import screenBox from "@/components/screenBox"
    import digitalList from "./digitalList.json"
    import itemDetail from '@/components/item-detail'

    export default {
        data() {
            return {
                activeTab: 1,
                offset: 10,
                dig_page_no: 1,
                ex_page_no: 1,
                digitalTagList: [],         // 数字货币 标签列表
                exchangeTagList: [],        // 交易所 标签列表
                digitalDataList: [],         // 数字货币 数据列表
                exchangeDataList: [],        // 交易所 数据列表
                loadMoreText: '加载更多',       
                digital_markList: [],
                exchange_markList: [],
            }
        },
        computed: {
            ...mapState({
                'digitalTags' : state => state.digitalTags,
                'exchangeTags' : state => state.exchangeTags
            })
        },
        created(){
            this.getHotMarkList();
            this.getTagList();
            this.getThemeList();
        },
        methods:{
            toggleSupperTab(el){
                this.activeTab = el;
                this.getTagList();
            },
            handleCheckDetial(row) {
                console.log(row)
                let $table = null;
                if(this.activeTab == 1){
                    $table = this.$refs.digitalTable
                }else{
                    $table = this.$refs.exchangeTable
                }
                $table.toggleRowExpansion(row)
                $table.toggleRowSelection(row)
            },
            loadMore(){
                if(this.activeTab == 1){
                    this.dig_page_no++;
                }else{
                    this.ex_page_no++;
                }
            },
            getHotMarkList(){
                let _this = this;
                this.$ajax.get(this.AJAX_BASEURL+ '/api/sign/signInfo',{nav_category_id: this.activeTab})
                    .then((res)=>{
                        if(_this.activeTab == 1){
                            _this.digital_markList = res.data;
                        }else{
                            _this.exchange_markList = res.data;
                        }
                    })
                    .catch((e)=>{

                    })
            },
            getTagList(){
                let _this = this;
                if(this.activeTab == 1 && this.digitalTagList.length > 0) 
                    return;
                if(this.activeTab == 2 && this.exchangeTagList.length > 0) 
                    return;
                this.$ajax.get(this.AJAX_BASEURL + '/api/nav/tags',{ nav_category_id : this.activeTab })
                    .then((res) => {
                        if(_this.activeTab == 1){
                            _this.digitalTagList = res.data;    
                        }else{
                            _this.exchangeTagList = res.data;    
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            },
            onChooseTag(tag,tag_type){
                // console.log(tag,tag_type)
                this.getThemeList();
                // todo todo page_no 初始化成 1
            },
            getThemeList(){
                let _this = this;
                let params = {
                    tag_id: [],
                    release_value: [],
                    sign_value: [],
                };
                let pageNo = 0;
                if(this.activeTab == 1){
                    console.log(this.digitalTags)
                    if(this.digitalTags){
                        params.tag_id = this.digitalTags['tag_id'] || [];
                        params.release_value = this.digitalTags['release_value'] || [];
                        params.sign_value = this.digitalTags['sign_value'] || [];
                    }
                    pageNo = this.dig_page_no;
                }else{
                    if(this.exchangeTags){
                        params.tag_id = this.exchangeTags['tag_id'] || [];
                        params.release_value = this.exchangeTags['release_value'] || [];
                        params.sign_value = this.exchangeTags['sign_value'] || [];
                    }
                    pageNo = this.ex_page_no;
                }
                this.$ajax.get(this.AJAX_BASEURL + '/api/theme/lists',
                    {
                        nav_category_id : _this.activeTab ,
                        tag_id: params.tag_id.join(),
                        release_value: params.release_value.join(),
                        sign_value: params.sign_value.join(),
                        page: pageNo
                    })
                    .then((res) => {
                        if(_this.activeTab == 1){
                            _this.digitalDataList = res.data;    
                        }else{
                            _this.exchangeDataList = res.data;    
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            },
            chooseMark(el,mark){
                document.querySelector("body").click();
                let url = el.is_sign ? '/api/sign/up' : '/api/sign/mark';
                let _this = this;
                this.$ajax.get(this.AJAX_BASEURL + url,
                    {nav_category_id: this.activeTab, theme_id: el.id, sign_info: mark})
                    .then((res) => {
                        if(res.errno){
                            alert(res.errmsg);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        

        },
        components:{
            screenBox,
            itemDetail
        }
    }
</script>

<style lang="scss">
.el-table__body{
    border-spacing: 0 15px;
}
.el-table thead{
    color: rgba(51,51,51,1);
    font-weight: 300;
}
.el-table td, .el-table th.is-leaf{
    border-bottom: none 0;
}
.el-table th{
    background: #F7F7F7;
    text-align: center;
    &.digital-cell{
        text-indent: -30px;
    }
}
.el-table__header-wrapper{
    margin-bottom: -20px;
}

.home-list-row{
    color: #333333;
    box-shadow: 0 6px 6px 0 rgba(0,0,0,0.06);
    border-radius: 4px;
    td{
        text-align: center;
        padding: 15px 0;
    }
    .cell{
        line-height: 1.4;
        .cell-btn{
            display: inline-block;
            margin: 7px;
            padding: 6px 13px;
            border-radius: 17px;
            text-align: center;
            border: 1px solid #FD5A22;
            color: #FD5A22;
            &:hover{
                cursor: pointer;
            }
        }
    }
    .expand-cell{
        i{
            font-size: 18px;
        }
        .el-table__expand-icon>.el-icon{

            margin: 0;
            transform: translate3d(-50%,-50%,0);
            z-index: 1;
        }
        .el-icon-arrow-right{
            color: #DDDDDD;
            &:before{
                content: "\E60B";
            }
        }
        .el-table__expand-icon--expanded{
            transform: scale(-1) translateZ(0);
            z-index: 1;
            .el-icon-arrow-right{
                color:#FD5A22;
            }
        }
    }
    .el-digital-logo{
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        vertical-align: middle;
    }
    .digital-cell{
        font-weight: bold;
        text-align: left;
    }
}
.el-table__expanded-cell:hover{
    background: #ECECEC !important;
}
.el-table__expanded-cell[class*=cell]{
    padding: 0;
}
.el-table__expanded-cell{
    background: #F7F7F7;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
    background: white;
}

.el-table .descending .sort-caret.descending{
    border-top-color: rgba(253,90,34,1);
}
.el-table .ascending .sort-caret.ascending{
    border-bottom-color: rgba(253,90,34,1);
}
.load-more-bar{
    width: 1200px;
    height: 46px;
    line-height: 46px;
    color: #999999;
    margin: 20px auto 30px auto;
    text-align: center;
    background: #EEEEEE;
    border-radius: 4px;
    i{
        margin: 0 4px;
    }
    &:hover{
        cursor: pointer;
    }
}
.el-popover{
    padding: 0;
}
</style>

<style scoped lang="scss">

.home-wapper {
    position: relative;
    width: 100%;
    min-width: 1200px;
    .head {
        position: relative;
        width: 100%;
        height: 220px;
        background: url('../assets/head-bg.png') no-repeat;
        background-size: 2880px 440px;
        background-position: bottom center;
        z-index: 1;
        .tab-container{
            position: relative;
            text-align: center;
            height: 94px;
            line-height: 94px;
            z-index: 2;
            .tab {
                display: inline-block;
                margin: 0 50px;
                color: #53515B;
                font-family: PingFangSC-Semibold;
                font-size: 24px;
                i{
                    position: relative;
                    top: 13px;
                    display: inline-block;
                    width: 48px;
                    height: 48px;
                    background-size: 100% 100% !important;
                    margin-right: 10px;

                }
                i.digital{
                    background: url('../assets/digital.png') no-repeat;
                }
                i.exchange{
                    background: url('../assets/exchange.png') no-repeat;
                }
                &:active{
                    opacity: 0.85;
                }
                &.active{
                    color: white;
                    i.digital{
                        background: url('../assets/digital_icon.png') no-repeat;
                    }
                    i.exchange{
                        background: url('../assets/exchange2.png') no-repeat;
                    }
                }
                
                img{
                    display: inline-block;
                }
            }
        }
    }
    .screen-box-parent{
        position: relative;
        width: 1200px;
        margin: -124px auto 0 auto;
        min-height: 200px;
        background: white;
        border-radius: 4px;
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.10);
        z-index: 2;
        &.active-digital{
            &:before{
                content: "";
                position: absolute;
                top: -20px;
                left: 485px;
                border: 10px solid transparent;
                border-bottom: 10px solid white;
            }
        }
        &.active-exchange{
            &:before{
                content: "";
                position: absolute;
                top: -20px;
                right: 450px;
                border: 10px solid transparent;
                border-bottom: 10px solid white;
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