<template>
  <div class='player' v-if='songList.length>0'>
    <div class='big' v-if='fullScreen'>
        <div class='bg'>
            <img :src="currentSong.albumUrl" alt="">
        </div>
        <button @click='changeSmall'>v</button>
        <h4>{{currentSong.songname}}</h4>
        <p>
          <span v-for='(item,index) in currentSong.singer' 
                :key='index'
          >{{item.name}}</span>
        </p>
        <!--专辑图片 -->
        <div class='img'>
          <img :src="currentSong.albumUrl" :class='cdClass' alt="">
        </div>
        <!-- 音乐 -->
        <audio ref='audio' 
            :src="currentSong.musicUrl" 
            @ended='musicEnd' 
            @canplay='canplay'  
            @timeupdate='updatetime'  
        ></audio>
        <!-- 控制台 -->
        <h3>{{text}}</h3>
        <hr>
        <button @click='play'>{{playing?'stop':'play'}}</button>
        <button @click='next'> next</button>
        {{nowIndex}}
        <hr>
        <my-progress :endTime='currentSong.interval'
                     :startTime='currentTime'
                     :changePlayTime='changePlayTime'
        ></my-progress>
    </div>
    <div @click ='changeBig' class='small' v-else> 

    </div>
  </div>
</template>
<script>
import{mapState,mapMutations,mapGetters} from 'vuex'
import MyProgress from  'components/my-progress.vue'
import {getLyric} from  'api/index.js'
import {Base64} from 'js-base64'
import  Lyric from 'lyric-parser'
console.log(Lyric)
export default {
  components:{MyProgress},
  data(){
    return{
      text:'暂无歌词',
      currentTime:0,
      playing:false  //当前的播放状态
    }
  },
  computed:{
    ...mapState(['songList','fullScreen','nowIndex','loop']),
    ...mapGetters(['currentSong']),
    cdClass(){
      return this.playing?'play':'play paused'
    }
  },
  methods:{
    ...mapMutations(['toggleScreen','changeNowIndex']),
    changeSmall(){
      this.toggleScreen(false)
    },
    changeBig(){
      this.toggleScreen(true)
    },
    // 播放
    play(){
  
       console.log(this.audio.__proto__)
       console.log('当前的暂停状态',this.audio.paused)
       if(this.playing){
         this.playing=false
         this.audio.pause()
       }else{
         this.audio.play()
         
         this.playing=true
       }
       this.lyricObj.togglePlay()
    },
    // 下一曲处理
    next(){
      // 修改全局状态值里的currenSong ->songList nowIndex 
      // 边界判断
      let nowIndex=this.nowIndex
      let nextIndex=++nowIndex
      console.log(nextIndex)
      this.changeNowIndex(nextIndex)
    },
    // 音乐播放结束
    musicEnd(){
      this.playing=false
      console.log('播放停止')
      this.musicLoop(2)
    },
    musicLoop(loopState){
      switch (loopState) {
        case 0: 
          break;
        case 1: 
          this.playing=true
          this.audio.play()
          break;
        case 2: 
          this.playing=true
          //获取列表总长度 
          let  length=this.songList.length 
          let index=parseInt(Math.random()*length)
           this.changeNowIndex(index)
          // 歌曲从网络而来 需要加载时间
          
          break;
        default:
          break;
      }
    },
    //音乐是否能够播放
    canplay(){
      if(!this.audio){
         this.audio=this.$refs.audio
       }
      console.log('可以播放')
      if(this.playing){
         this.audio.play()
      }
    },
    // 歌曲时间变化监听
    updatetime(e){
      // console.log('时间变了',e)
      this.currentTime=e.target.currentTime
    },
    changePlayTime(time){
      if(!this.audio) return false
      this.audio.currentTime=time
      this.lyricObj.seek(time*1000)
    } 
  },
  created(){
 
  },
  watch:{
    currentSong(newValue,oldValue){
      // 歌曲发生改变触发
      let songmid=newValue.songmid
      console.log('歌曲变化',newValue)
      getLyric(songmid).then((res)=>{
        let string=Base64.decode(res.lyric)
        // 歌词的解析对象
        this.lyricObj= new Lyric(string,(text)=>{
          console.log(text)
          this.text=text.txt
        })
        console.log(this.lyricObj)
      })
    }
  }
}
/*
7.放大缩小
1.显示数据 （歌名 歌手 专辑）
2.播放歌曲
3.按钮栏 播放  前进 后退 循环  
4.进度条  拖动进度
5.收藏
6.歌词显示

*/ 
</script>
<style lang="less" scoped>
@import '~style/index.less';
.player{
  font-size:@fs-m;
  .big{
     .fixed(0,0,0,0,rgba(0,0,0,.7));
    .bg{
      position: absolute;
      width: 100%;
      z-index: -99;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        
        filter: blur(20px);
      }
    }
   
    z-index: 4;
    .img{
      display: flex;
      justify-content: center;
      img{
         border-radius:50%; 
        &.play{ 
           animation: rotate 6s linear infinite ;
        }
        &.paused{
          animation-play-state: paused; 
        }
       
      }
      
    }
  }
  .small{
    position: fixed;
    height: 80px;
    background: green;
    .w(375);
    bottom: 0;
    z-index: 4;
  }

}
@keyframes rotate{
  0% {
     transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
}
</style>