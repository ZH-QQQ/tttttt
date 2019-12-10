import Vue from  'vue'
import  Vuex from 'vuex'
import { stat } from 'fs'
Vue.use(Vuex)

const store =new Vuex.Store({
  state:{
    fullScreen:true,//大小播放器的切换
    songList:[],//歌单列表 同时控制播放器是否渲染
    nowIndex:-1,//当前正在播放的是那首歌
    loop:1  //   1单曲循环  2列表循环  3随机循环  0不循环
  },
  mutations:{
    // 添加歌单 显示播放器
    addSongList(state,params){
      state.songList=params
    },
    //切换大小播放器
    toggleScreen(state,params){
      // params boolean 
      state.fullScreen=params
    },
    //更改正在播放的歌曲在列表中的下标
    changeNowIndex(state,playIndex){
      state.nowIndex=playIndex
    }
  },
  getters:{
    currentSong(state){
      // 获取正在播放的歌曲数据
      return state.songList[state.nowIndex]
    }
  }
})

export default store