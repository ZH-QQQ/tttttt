<template>
  <div class='singer-box'>
    <div class="singer">
      <!-- 左侧的歌手列表 -->
      <ul>
        <li v-for='(item,index) in singers'
            :key='index'
            ref='test'>
          <div class='title'>{{item.title}}</div>
          <!-- 循环歌手列表 -->
          <ol>
            <li v-for='(sItem,sIndex) in item.list'
                :key='sIndex'
                @click="jumpDetail(sItem.Fsinger_mid)"
                class='singer-item'>
              <img :src="sItem.Fsinger_url"
                   alt="">
              <span>
                {{sItem.Fsinger_name}}
              </span>
            </li>
          </ol>
        </li>
      </ul>
      <!-- 索引列表 -->
      <ul class='slider'
          @touchstart='touchStart'
          @touchmove.stop='touchMove'
          @touchend='touchEnd'>
        <li v-for='(item,index) in sliderData'
            :key='index'
            :class='selIndex===item?"sel":""'
            @click='sliderClick(item)'>

          {{item}}
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList, avatorUrl } from 'api/index.js'
console.log(getSingerList)
import { initSingerData } from './singer.js'
import Bs from 'better-scroll'
export default {
  computed: {
    avatorUrl (mid) {
      console.log(mid)
    }
  },
  data () {
    return {
      singers: [],
      selIndex: 'B'
    }
  },
  computed: {
    sliderData () {
      // 根据歌手列表信息产生侧边栏数据
      let result = this.singers.map((item, index) => {
        return item.title
      })
      return result
    }

  },
  methods: {
    jumpDetail (mid) {
      var mid = mid || '002J4UUk29y8BY'
      this.$router.push(`/singer/${mid}`)
    },
    // 滑动事件
    touchStart () {
      console.log('按下')
    },
    touchMove (e) {
      let distanceY = e.touches[0].pageY - 100
      let num = parseInt(distanceY / 20)

      console.log('移动', distanceY, num)
      this.moveElement(num)
    },
    touchEnd () {
      console.log('抬起')
    },
    // 点击侧边栏
    sliderClick (item) {
      console.log(11)
      //1.高亮
      this.selIndex = item
      // 滚动元素
      let index = this.sliderData.indexOf(item)
      this.moveElement(index)
    },
    moveElement (index) {
      this.bs.scrollToElement(this.$refs.test[index])
    },
    initBs () {
      this.bs = new Bs('.singer', {
        probeType: 3,
        click: true
      })
      this.bs.on('scroll', (pos) => {
        let y = Math.abs(pos.y) //向上滚动的距离
        // console.log('滚',y)
        let index = 0
        for (let i = 0; i < this.tops.length; i++) {
          if (y >= this.tops[i] && y < this.tops[i + 1]) {
            index = i
            // console.log('满足',i)
          }
        }
        // console.log(index)
        this.selIndex = this.sliderData[index]
        //边界bug处理
      })
    },
    // 获取滚动列表高度的数组
    getTops () {
      this.tops = this.$refs.test.map((item) => {
        return item.offsetTop
      })
      // console.log(this.tops)
    }
    // 处理歌手数据

  },
  created () {
    console.log(1111)
    getSingerList().then((res) => {
      let result = initSingerData(res.data.list)
      this.singers = result
      this.$nextTick(() => {
        this.getTops()
      })
    })
  },
  mounted () {
    this.initBs()

  }
}
/*
1.获取数据v
2.根据数据显示界面v
a1  a2  b1  b2  
{'首字母':{title:'首字母',list:[首字母相同的歌手]}}
{}
没有首字母a 添加  
{'a':{title:'a',list:[a1]}}
首字母有 push
{'a':{title:'a',list:[a1,a2]}}

{ 'a':{title:'a',list:[a1,a2]},
  'b':{title:'b',list:[b1,b2]}
}
3.左侧歌手列表 v 右侧下标索引 v
4.左侧可以滚动控制右侧  
    1.将列表高度形成数组，
    2.每次滚动判断距离在哪个范围之内获取范围下标 
    3.根据下标获取字母
a 100  b 100   c  100 
[0,100,200,300]
   
     150 
5.右侧可以点击可以滚动控制左侧
  a.添加点击事件
  b.侧边栏高亮改变 tab
  c.左侧滚动到固定位置  betterscrooll 提供的scrollToelement方法 滚动到某一个元素
6.右侧滚动也能控制左侧
  1.滑过的距离 每一个li 的高度
  2.滑过的块数  = 距离/高度 
  3.根据滑块数控制左侧的滚动
7.点击跳转详情页
7.吸顶效果
8.懒加载优化
*/
</script>


<style scoped lang="less">
// 样式中使用别名+ ~
@import "~style/index.less";
.singer {
  .fixed(88, 0, 0, 0, @black);
  overflow: hidden;
  .title {
    .w(375);
    .h(30);
    background: #333;
    .l_h(30);
    padding-left: 20px;
    font-size: @fs-xs;
    color: @black_o5;
  }
  .singer-item {
    .w(375);

    height: 70px;
    box-sizing: border-box;
    padding: 20px 0 0 30px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      margin-left: 20px;
      color: @black_o5;
      font-size: @fs-s;
    }
  }
  // 侧边栏
  .slider {
    position: absolute;
    top: 60px;
    right: 3px;
    z-index: 2;
    font-size: @fs-xs;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    padding: 20px 0 20px 0;
    color: @black_o5;
    li {
      width: 20px;
      height: 18px;
      line-height: 18px;
      text-align: center;
    }
    .sel {
      color: @yellow;
    }
  }
}
</style>
