# 导航相关接口 #
测试host： 47.75.103.225 tcy.nav.digwiz.io

##导航分类与标签获取

```
1、GET /api/nav/tags

```

+ 参数
    + nav_category_id ：非必须，默认id为数字货币分类


#### 响应结果：
    {
      "errno": 0,
      "errmsg": "",
      "data": {
        "nav_category": [
          {
            "nav_category_id": 1,
            "name": "数字货币"
          },
          {
            "nav_category_id": 2,
            "name": "交易所"
          }
        ],
        "tags": {
          "1": {                       //1对应nav_category_id
            "特色标签": [
              {
                "tag_id": 0,
                "tag_name": "全部"
              },
              {
                "tag_id": 1,
                "tag_name": "最多人交易Top100"
              },
              {
                "tag_id": 2,
                "tag_name": "支持上层APP开发"
              }
            ],
            "发行时间": [
              {
                "release_id": 0,
                "release_time": "全部",       //展示数据
                "release_value": ""          //传参数据
              },
              {
                "release_id": 1,
                "release_time": 2018,
                "release_value": 2018
              },
              {
                "release_id": 2,
                "release_time": 2017,
                "release_value": 2017
              }
            ],
            "买过的人数": [
              {
                "sign_id": 0,
                "sign_num": "全部",           //展示数据
                "sign_value": ""             //传参数据
              },
              {
                "sign_id": 1,
                "sign_num": "1万以上",
                "sign_value": "10000"
              },
              {
                "sign_id": 2,
                "sign_num": "5000-10000",
                "sign_value": "5000-10000"
              },
              {
                "sign_id": 2,
                "sign_num": "小与5000",
                "sign_value": "0-5000"
              }
            ]
          }, 
          "2": {                            //2对应nav_category_id
            "特色标签": [
              {
                "tag_id": 0,
                "tag_name": "全部"
              },
              {
                "tag_id": 1,
                "tag_name": "最多人交易Top100"
              },
              {
                "tag_id": 2,
                "tag_name": "可用人民币进场"
              }
            ],
            "上线时间": [
              {
                "release_id": 0,
                "release_time": "全部",
                "release_value": ""
              },
              {
                "release_id": 1,
                "release_time": 2018,
                "release_value": 2018
              },
              {
                "release_id": 2,
                "release_time": 2017,
                "release_value": 2017
              }
            ],
            "用过的人数": [
              {
                "sign_id": 0,
                "sign_num": "全部",
                "sign_value": ""
              },
              {
                "sign_id": 1,
                "sign_num": "1万以上",
                "sign_value": "10000"
              },
              {
                "sign_id": 2,
                "sign_num": "5000-10000",
                "sign_value": "5000-10000"
              },
              {
                "sign_id": 2,
                "sign_num": "小与5000",
                "sign_value": "0-5000"
              }
            ]
          }
        }
      }
    }



## 获取数据列表

```
2、GET /api/theme/lists

```

+ 参数
    + nav_category_id ：必须，导航分类id(数字货币，交易所)
    + tag_id ：         必须，特色标签id
    + release_value     必须，货币发行时间/交易所上线时间
    + sign_value        必须，货币买过的人数/交易所用过的人数


#### 响应结果：
    币种如下：
    {
      "errno": 0,
      "errmsg": "",
      "data": [
        {
          "id": 1,
          "image": "https://btc123.oss-cn-beijing.aliyuncs.com/142b027b76e04387b81e2e9f711c79ec.jpg",
          "name": "比特币(BTC)",
          "release_time": "2017/08/06",
          "market_value_CNY": "764900000000",
          "market_value_USD": "764900000000",
          "price_USD": "6200",
          "price_CNY": "44334",
          "sign_num": "1200"
        },
        {
          "id": 2,
          "image": "https://btc123.oss-cn-beijing.aliyuncs.com/142b027b76e04387b81e2e9f711c79ec.jpg",
          "name": "比特币(BTC)",
          "release_time": "2017/08/06",
          "market_value_CNY": "764900000000",
          "market_value_USD": "764900000000",
          "price_USD": "6200",
          "price_CNY": "44334",
          "sign_num": "1200"
        }
      ]
    }
    
    交易所如下：
        {
          "errno": 0,
          "errmsg": "",
          "data": [
            {
              "id": 1,
              "image": "https://btc123.oss-cn-beijing.aliyuncs.com/142b027b76e04387b81e2e9f711c79ec.jpg",
              "name": "B网",
              "coin_nums": "20",    //交易币种数
              "country": "美国",
              "24h_value": "764900000000",
              "sign_num": "1200"    //用过的人数
            },
            {
              "id": 2,
              "image": "https://btc123.oss-cn-beijing.aliyuncs.com/142b027b76e04387b81e2e9f711c79ec.jpg",
              "name": "火币",
              "coin_nums": "20",    //交易币种数
              "country": "美国",
              "24h_value": "764900000000",
              "sign_num": "1450"    //用过的人数
            }
          ]
        }
    
## 标记买过

```
3、GET /api/sign/mark

```

+ 参数
    + nav_category_id ：必须，导航分类id(数字货币，交易所)
    + theme_id ：       必须，特色标签id
    + sign_info         必须，标记信息（币种：“大赚”、“赚了”、“赔了”、“血赔”、“持有，看好”、“持有，不看好”，交易所：正在用，推荐用”、“正在用，好用”、“正在用，不评价”、“用过，不再用”、“用过，难用”）


#### 响应结果：
    {
      "errno": 0,
      "errmsg": "",
      "data": []
    }
    errno非0表示失败，errmsg为失败原因


## 标记买过

```
3、GET /api/sign/mark

```

+ 参数
    + nav_category_id ：必须，导航分类id(数字货币，交易所)
    + theme_id ：       必须，主题id（币种id/交易所id）
    + sign_info         必须，标记信息（币种：“大赚”、“赚了”、“赔了”、“血赔”、“持有，看好”、“持有，不看好”，交易所：正在用，推荐用”、“正在用，好用”、“正在用，不评价”、“用过，不再用”、“用过，难用”）


#### 响应结果：
    {
      "errno": 0,
      "errmsg": "",
      "data": []
    }
    errno非0表示失败，errmsg为失败原因
    
## 获取下拉详情信息

```
4、GET /api/theme/downInfo

```

+ 参数
    + nav_category_id ：必须，导航分类id(数字货币，交易所)
    + theme_id ：       必须，主题id（币种id/交易所id）
    

#### 响应结果：
    {
      "errno": 0,
      "errmsg": "",
      "data": {
        "tags": [
          {
            "tag_id": 1,
            "tag_name": "支持交易即挖矿"
          },
          {
            "tag_id": 2,
            "tag_name": "不需要翻墙"
          }
        ],
        "desc": {
          "简介": "<p>火币网是国内安全可信赖的比特币交易平台，获得真格基金、戴志康、红杉资本（苹果、阿里巴巴等众多全球知名公司股东）等A轮千万人民币资本投资，火币执行严格风控管理，稳定运行。截止2016年末，火币累计成交额达20000亿人民币。</p><p>火币网未来主要布局海外交易。创始人李林在公开信中表示，目前在全球范围内开展5大业务，包括火币全球专业站，火币韩国，火币中国，火币钱包，火币全球美元站。其中，火币中国偏重于区块链技术研发和应用类资讯信息，而火币韩国和火币全球美元站将继续提供当地法币对数字货币的数字资产交易服务</p>",
          "亮点": "<p>火币交易闪电手[7] ：一款为交易员量身定做的短线交易工具。提供20档盘口每秒250笔实时成交记录，0延时的闪电交易，支持交易窗口与行情窗口分屏显示，用户可轻松进行行情图表分析。</p><p>火币APP[8] ：比特币行业功能全面的一款APP。一款提供注册、充值、交易、提现、资讯一体化服务的比特币交易APP。此款APP具有价格提醒功能，让用户不错过行情</p>"
        }
      }
    }
    errno非0表示失败，errmsg为失败原因
    

## 获取热门主题（货币/交易所）
```
5、GET /api/theme/hot 

```

+ 参数
    + nav_category_id ：必须，导航分类id(数字货币，交易所)
    

#### 响应结果：
    {
       "errno": 0,
       "errmsg": "",
       "data": [
         {
           "id": 1,
           "name": "以太坊（ETH）",
           "sign_num": "1234"
         },
         {
           "id": 2,
           "name": "比特币（BTC）",
           "sign_num": "342"
         },
         {
           "id": 3,
           "name": "比特币现金（BCH）",
           "sign_num": "134"
         }
       ]
     }
     
     

## 获取主题基本信息
```
6、GET /api/theme/info 

```

+ 参数
    + nav_category_id ：必须，导航分类id(数字货币，交易所)
    + theme_id ：       必须，主题id（币种id/交易所id）

#### 响应结果：
    币种
    {
      "errno": 0,
      "errmsg": "",
      "data": {
        "id": 1,
        "name": "比特币（BTC）",
        "image" : "https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d4b88bf54fa98226b8c12c21b2b9de3c/9a504fc2d5628535daa1dba19cef76c6a6ef63e8.jpg",   //图片
        "desc": "​一款为交易员量身定做的短线交易工具。提供20档盘口每秒250笔实时成交记录，0延时的闪电交易，支持交易窗口与行情窗口分屏显示，用户可轻松进行行情图表分析。\n比特币行业功能全面一款APP。一款提供注册、充值、交易、提现、资讯一体化服务的比特币交易APP。此款APP具有价格提醒功能，让用户不错过行情",  //名称下的简介
        "tags" ：[
          {
            "tag_id": 1,
            "tag_name": "最多人交易"
          },
          {
            "tag_id": 2,
            "tag_name": "无需翻墙"
          }
        ],
        "sign_num" : 123,   //人数
        "release_time": "2018/09/07",   //发行时间
        "release_total": "12235345456", //发行总数
        "coin_type": "基础链",          //币种类型
        "crowd_funding_price": "无众筹", //币种价格
        "white_paper": "https://etherscan.io",   //白皮书地址
        "official_network": "https://etherscan.io",  //官网
        "tele": "https://etherscan.io",     //tele群
        "desc_desc": "<p>以太坊的概念首次在2013至2014年间由程序员Vitalik Buterin受比特币启发后提出，大意为“下一代加密货币与去中心化应用平台”，在2014年通过ICO众筹开始得以发展。</p><p>截至2018年2月，以太币是市值第二高的加密货币，仅次于比特币<br/></p><p><br/></p>",   //介绍中的简介
        "desc_bright_spot": "以太坊协议将尽可能简单，即便以某些数据存储和时间上的低效为代价。一个普通的程序员也能够完美地去实现完整的开发说明。这将最终有助于降低任何特殊个人或精英团体可能对协议的影响并且推进以太坊作为对所有人开放的协议的应用前景。添加复杂性的优化将不会被接受，除非它们提供了非常根本性的益处", //介绍中的团队介绍
        "desc_public_info": "<p>启动以太币销售——在以太坊博客上第一次官方公告</p><p>Ether.Fund上关于预售的简明统计页面（此后停用）</p><p>概览：以太坊的首次公开销售 —— slacknation博客发帖 ——关于以太币预售的所有统计数字</p><p>关于预售的条款声明</p>",    //介绍中的公募信息
        "desc_road_map": ""     //介绍中的路线图
      }
    }
    
    交易所
    {
      "errno": 0,
      "errmsg": "",
      "data": {
        "id": 1,
        "image" : "https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d4b88bf54fa98226b8c12c21b2b9de3c/9a504fc2d5628535daa1dba19cef76c6a6ef63e8.jpg",
        "name": "OKEX",
        "24h_value" : "1234",
        "desc": "​OKEx老用户登入地址（www.okex.com）    新用户注册地址（www.okb.com）是全球著名的数字资产交易平台之一，主要面向全球用户提供比特币、莱特币、以太币等数字资",  //名称下的简介
        "tags" ：[
          {
            "tag_id": 1,
            "tag_name": "最多人交易"
          },
          {
            "tag_id": 2,
            "tag_name": "无需翻墙"
          }
        ],
        "sign_num" : 123,   //人数
        "official_network": "https://etherscan.io",  //官网
        "tele": "https://etherscan.io",     //tele群
        "phone" : '123456788',  //客服电话
        "desc_desc": "<p>以太坊的概念首次在2013至2014年间由程序员Vitalik Buterin受比特币启发后提出，大意为“下一代加密货币与去中心化应用平台”，在2014年通过ICO众筹开始得以发展。</p><p>截至2018年2月，以太币是市值第二高的加密货币，仅次于比特币<br/></p><p><br/></p>",   //介绍中的简介
        "desc_bright_spot": "以太坊协议将尽可能简单，即便以某些数据存储和时间上的低效为代价。一个普通的程序员也能够完美地去实现完整的开发说明。这将最终有助于降低任何特殊个人或精英团体可能对协议的影响并且推进以太坊作为对所有人开放的协议的应用前景。添加复杂性的优化将不会被接受，除非它们提供了非常根本性的益处", //介绍中的团队介绍
        "desc_team": "<p>启动以太币销售——在以太坊博客上第一次官方公告</p><p>Ether.Fund上关于预售的简明统计页面（此后停用）</p><p>概览：以太坊的首次公开销售 —— slacknation博客发帖 ——关于以太币预售的所有统计数字</p><p>关于预售的条款声明</p>",    //介绍中的公募信息
        "desc_coin": "平台币介绍",     //介绍中的路线图
        "coins" :[
           {
             "coin_id": 1,
             "coin_name": "ETC"
           },
           {
             "coin_id": 2,
             "coin_name": "ETH"
           }
         ]
      }
    }
    
    说明：已desc_开头的数据，如果value为空，则模块不显示，例如desc_road_map值为空，则路线图模块不展示
    
## 获取详情动态信息（货币/交易所）
```
7、GET /api/theme/dynamic 

```

+ 参数
    + nav_category_id ：必须，导航分类id(数字货币，交易所)
    + theme_id ：       必须，主题id（币种id/交易所id）

#### 响应结果：
    币种返回
    {
      "errno": 0,
      "errmsg": "",
      "data": {
        "price_USD": "23454564",    //价格 usd
        "price_CNY": "3456567",     //价格 cny
        "change_24h": "+1%",        //24小时涨跌幅
        "market_value_USD": "3453765",   //市值 
        "market_value_CNY": "343453765", //市值
        "market_value_ranking": 2        //排名
      }
    }
    
    交易所返回
    {
      "errno": 0,
      "errmsg": "",
      "data": {
        "24h_value" => 12343   //24小时交易额
      }
    }
     
  
