<template>
  <div class="my-header">
     <!-- <img src="/favicon.ico" alt=""> -->
     <!-- 使用public文件下的图片直接写根路径 -->
     <!-- <img src="../assets/logo.png" alt=""> -->
     <!-- <img :src="img1" alt=""> -->
     <!-- <img :src='img2'> -->
     <span>Music</span>
     
  </div>
</template>

<script>
// import  img from   "../assets/logo.png"
export default {
  data(){
    return{
      // img1:"/favicon.ico",
      // img2: img //"../assets/logo.png"
    }
  }
}
</script>


<style scoped lang="less">
@import url('../style/index.less');
.my-header{
  .w(375);
  .h(44);
  background: @black;
  color: @yellow;
  font-size: @fs-l;
  .t_c();
  .l_h(44);
}
</style>
