<template>
  <div id="app">
    <navigation></navigation>
    <div class="wrapper" :class="{'hasNotice':hasNotice}" id="view_wrapper">
      <router-view></router-view>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import navigation from "@/components/navigation"
import copyright from "@/components/copyright"
import { state, mapState } from "vuex"

export default {
  name: 'App',
  computed:{
    ...mapState({
      hasNotice: state => state.hasNotice
    })
  },
  components:{
    navigation,
    copyright
  }
};
</script>

<style lang="scss">
body{
  width: 100%;
  background: #F7F7F7;
  font-family: PingFangSC-Light,Arial,Helvetica,sans-serif,"Hiragino Sans GB !important"; 
}
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,input,textarea,img,div{margin:0;padding:0;border:0;outline: none; -webkit-touch-callout: none;-webkit-tap-highlight-color:rgba(255,0,0,0);text-rendering: geometricPrecision;}
ul,ol,li{
  list-style: none;
}
a,a:link, a:hover,a:visited,a:enabled{
  text-decoration: none;
  color: white;
}
.wrapper{
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-transform: translateZ(0) scale(1.0, 1.0);
  margin-top: 68px;
  &.hasNotice{
    margin-top: 104px;
  }
}
.clearFix:after{
  content: '';
  display: table;
  width: 0;
  visibility: hidden;
  clear: both;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
</style>
