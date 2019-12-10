<template>
 <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" 
             v-for='(item,index) in data'
             :key="index"
        >
          <img :src="item" alt="">
        </div>
     
    </div>
  </div>  
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css';
export default {
 props:{
   data:{
     type:Array,
     default:[4,5,6]
   }
 },
 methods:{
   initBanner(){
     new Swiper('.swiper-container',{
        loop: true// 循环模式选项
     })
   }
 },
 watch:{
   data(newValue ,oldValue){
     this.$nextTick(()=>{
       this.initBanner()
     })
   }
 }
}
</script>


<style scoped lang="less">
@import  '~style/index.less';
.swiper-container{
  .w(375);
  .h(150);
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
