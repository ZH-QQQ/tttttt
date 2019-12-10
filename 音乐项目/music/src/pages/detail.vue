<template>
  <div class="detail">
    <div class="back">
      <button @click='back'>back</button>
    </div>

    <span class="name">{{name}}</span>

    <img width='100'
         :src="img"
         alt=""
         class="bg-img">
    <ul>
      <li v-for='(item,index) in list'
          :key='index'
          @click='goPlay(index)'>
        <p>{{item.songname}}</p>
        <p>
          <span v-for='(singerName,nIndex) in item.singer '
                :key='nIndex'>
            {{singerName.name}}
          </span>
          {{item.albumname}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script> 
import { getSongList, getMusicUrl } from 'api/index.js'
import { getAvatorUrl, songData } from 'utils/song.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      name: '',
      img: '',
      list: []
    }
  },
  methods: {
    ...mapMutations(['addSongList', 'changeNowIndex']),
    back () {
      this.$router.go(-1)
    },
    goPlay (index) {
      //  getMusicUrl(songmid)
      //  .then((res)=>{console.log(res)})
      this.addSongList(this.list)
      this.changeNowIndex(index)
    },
    getSongData (mid) {
      getSongList(mid).then((res) => {
        console.log(res)
        // 歌手名   歌手头像  歌曲的信息(歌名  歌曲的地址  专辑名 专辑的图片地址)
        this.name = res.data.singer_name

        this.img = getAvatorUrl(res.data.singer_mid)
        let tmpdata = songData(res.data.list)
        getMusicUrl(tmpdata)
          .then((res) => {
            console.log(res)
            this.list = res
          })

      })
    }
  },
  created () {
    let mid = this.$route.params.mid
    this.getSongData(mid)
  }
}
</script>


<style scoped lang="less">
@import "~style/index.less";

.detail {
  .fixed(0, 0, 0, 0, red);
  .back {
    position: absolute;
    top: 0;
    left: 6px;
  }
  .name {
    position: absolute;
    top: 0;
    left: 10%;
    // z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 40px;
    font-size: @fs-l;
    color: @hui;
  }
  .bg-img {
    width: 100%;
    .h(262.64);
  }
}
</style>
