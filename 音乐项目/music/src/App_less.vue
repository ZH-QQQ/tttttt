<template>
  <div class='hehe'> 
      <!-- <p>
        <span>2324</span>
      </p>
      <div>

      </div> -->
  </div>
</template>

<script>


export default {
  name: 'app',

}
</script>

<style lang='less' scoped>
// scoped 样式只对改组件有用
// 变量 计算 
// mixin 对样式的封装 
// .test(@hehe){
//     width: 50px;
//     height: 50px;
//     background:@hehe;
// }
// //变量
// @blue:blue;
// @color:#111111;
// @red:#ff0000;
// .hehe{
//   // 属性计算 数值类型
//   background:@color*6;
//   width: 100px;
//   height: 100px;
//   p{
//     .test(@red)
//   }
//   div{
//     .test(@blue)
//   }
// }
@import url('./style/index.less');
.hehe{
  .w(60);
  .h(60);
  background: red;
}
</style>
