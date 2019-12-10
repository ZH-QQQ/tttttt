<template>
  <div class='app'> 
    <!-- 头部 -->
    <my-header></my-header>
    <!-- tab -->
    <my-tab></my-tab>
    <!-- 路由 -->
    <router-view></router-view>
    <!-- 播放器 -->
    <player></player>
  </div>
</template>

<script>
// js 连字符 -  可能被当成 减法计算  -h == H
import player  from 'pages/player/player'
import  myHeader from  './components/my-header.vue'
import  myTab from  './components/my-tab.vue'
export default {
  components:{myHeader,myTab,player},
  name: 'app',

}
</script>

<style lang='less' scoped>

@import url('./style/index.less');
.app{
  background: @black;
}
</style>
