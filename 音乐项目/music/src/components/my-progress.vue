<template>
  <div class="progress">
    <span>{{startTime|timeFilter}}</span>
    <div class='progress-box' ref='box'>
      <!-- 滚动条内部 -->
      <div class='progress-content' ref='progress' ></div>
      <!-- 滑块 -->
      <div class='dot' ref='dot'
         @touchstart='touchStart'
         @touchmove='touchMove'
         @touchend='touchEnd'
      >

      </div>
    </div>
    <span>{{endTime|timeFilter}}</span>
  </div>
</template>

<script>
import { filter } from 'minimatch';
export default {
  props:['endTime','startTime','changePlayTime'],
  filters:{
    timeFilter(data){
      var data=parseInt(data)
      let m =parseInt(data/60)<10?'0'+parseInt(data/60):parseInt(data/60)
      let s=data%60<10?'0'+data%60:data%60
      return  `${m}:${s}`
    }
  },
  methods:{
    touchStart(){
       this.left=this.$refs.box.getBoundingClientRect().x
      //  console.log(this.left)
    },
    touchEnd(){

    },
    touchMove(e){
      // console.log(e.touches[0].pageX)
      let x=e.touches[0].pageX-this.left-10
      // 边界判断
      
      if(x>=0&&x<=this.w){
        // 控制样式
        this.offsetWidth(x)
        // 计算时间百分比
        let precent=(x/this.w)
        let time=precent*this.endTime
        console.log('进度',precent)
        this.changePlayTime(time)
      }
    },
    offsetWidth(distance){
      // console.log('距离',distance)
      // 滑块的位置改变
       this.$refs.dot.style.transform=`translate3d(${distance}px,0,0)`
        // 进度条的位置改变
       this.$refs.progress.style.width=distance+'px'
    },
    move(){
      // let time=parseInt(Math.random()*this.endTime)
      // console.log(time)
      // this.changePlayTime(time)
    }
  },
  watch:{
    startTime(newTime,oldTime){
      // 监听播放时间改变
      let distance=(newTime/this.endTime)*this.w
      // console.log('watch',newTime,this.endTime,this.w)
      this.offsetWidth(distance)
    }
  },
  mounted(){
     this.w=this.$refs.box.getBoundingClientRect().width
  }
}
/*
1.显示 初始时间 （开始 0  结束）
2.随着歌曲的播放  
    时间变化  
    条也要变
3.拖动进度条小滑块
  1.滑块的位置改变  v
  2.进度条改变    v
  3.歌曲播放位置改变 
  能够控制歌曲的播放

*/ 
</script>


<style scoped lang="less">
@import '~style/index.less';
.progress{
  display: flex;
  .progress-box{
    position: relative;
    .w(340);
    height:4px;
    background: rgba(0,0,0,.8);
    .progress-content{
      width: 0px;
      height: 4px;
      background: @yellow;
    }
    .dot{
      width: 20px;
      height: 20px;
      background: red;
      position: absolute;
      top:-8px;
      left: 0;
    }
  }
}
</style>
