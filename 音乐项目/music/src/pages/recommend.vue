<template>
  <div class="recommend">
    <div class='view-box'>
      <div class='content'>
        <div class='banner'>
          <my-banner :data="banners"></my-banner>
        </div>
        <!-- 轮播图 -->
        <div class='title'>热门歌曲推荐</div>
        <ul class='list'>

          <li v-for='(item,index) in list' 
              :key='index'
              class='list-item'
           >
            <div class='img'>
              <img :src="item.imgurl" alt="">
            </div>
            <div class='info'>
                <h2>{{item.creator.name}}</h2>
                <p>{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import myBanner from  '../components/my-banner'
import Bs from  'better-scroll'
import {getBanner,getRecommentList} from '../api'
export default {
 components:{myBanner},
 data(){
   return{
     list:[],
     banners:[]
   }
 },
 methods:{
    initBs(){
      new Bs('.view-box')
    }
 },
 created(){
   getBanner().then((res)=>{
     this.banners=res.data.slider.map((item)=>{return item.picUrl})


     })
   getRecommentList().then((data)=>{
     console.log('list',data)
     this.list=data.data.list
     console.log(this.list)
     })
 },
 mounted(){
   this.initBs()

 }
}
</script>


<style scoped lang="less">
@import url('../style/index.less');
.recommend{
 .fixed(88,0,0,0);
 .view-box{
   width: 100%;
   height: 100%;
   overflow: hidden;
   .content{
     .w(375);
    //  background: yellow;
     .banner{
       .w(375);
       .h(150);
      //  background: red;
     }
     .title{
       .w(375);
       height: 65px;
       color: @yellow;
       line-height: 65px;
       text-align: center;
       font-size: @fs-s;
     }
     .list{
       .list-item{
         box-sizing: border-box;
         .w(375);
         height: 82px;
         padding: 0 20px 20px 20px;
        //  border: 1px solid red;
         display: flex;
          align-items: center;
         .img{
           width: 60px;
           height: 60px;
           padding-right: 20px; 
           img{
             width: 100%;
             height: 100%;
           }
         }
         .info{
           height: 50px;
           font-size: @fs-s;
           h2{
             height: 20px;
             font-weight: 400;
             padding-bottom:10px;
             color: #fff; 
             font-size: @fs-s;
           }
           p{
             height: 20px;
             color: @black_o3;
           }
         }
       }
     }
   }
 }
}
</style>
