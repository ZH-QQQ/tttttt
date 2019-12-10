// 同一管理项目的api接口
import axios from  '../utils/axios'
import jsonp from  'jsonp'
export const  getRecommentList=()=>{
 return new Promise((resolve,reject)=>{
  let url='/hehe/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.03328395236535786'
  axios.get(url)
  .then((data)=>{
   resolve(data)
  })
  .catch((err)=>{
    reject(err)
  })
 })
}
export const  getBanner=()=>{
  return new Promise((resolve,reject)=>{
    let url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1'
      jsonp(url,{param:'jsonpCallback'},(err,data)=>{
          if(err){
            reject(err)
          }else{
            resolve(data)
          }
      })
  })
}
// 获取歌手数据
export const getSingerList=()=>{
 return new Promise((resolve,reject)=>{
   let url='https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq'
   jsonp(url,{param:'jsonpCallback'},(err,data)=>{
    if(err){
      reject(err)
    }else{
      resolve(data)
    }
})
  })
}
// 获取歌手歌单

export const getSongList=(mid)=>{
  var mid=mid||'002J4UUk29y8BY'
  return new Promise((resolve,reject)=>{
    let url=`https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${mid}`
    jsonp(url,{param:'jsonpCallback'},(err,data)=>{
     if(err){
       reject(err)
     }else{
       resolve(data)
     }
 })
   })
 }

// 根据mid 获取歌曲正确地址
export const  getMusicUrl=(list)=>{
  // console.log('要获取连接的列表数据',list)
  let types=[]
  let mids=list.map((item,index)=>{
    types.push(0)
    return item.songmid
  })
  
  let url='/hy/cgi-bin/musicu.fcg'
  // https://u.y.qq.com/cgi-bin/musicu.fcg
  let songmid='003mBrF72dILfK'
  let data={
   params:{
     '-':'getplaysongvkey6571975011397966',
     g_tk: 5381,
     loginUin: 0,
     hostUin: 0,
     format: 'json',
     inCharset: 'utf8',
     outCharset: 'utf-8',
     notice: 0,
     platform: 'yqq.json',
     needNewCode: 0,
     data:`{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"909025638","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"909025638","songmid":${JSON.stringify(mids)},"songtype":${JSON.stringify(types)},"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}`
   }
  }
  return new Promise((resolve,reject)=>{
    axios(url,data)
    .then((data)=>{
      console.log(data)
      let prev='http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/'
      let urlInfos=data.req_0.data.midurlinfo
      let result=list.map((item,index)=>{
          item.musicUrl=prev+urlInfos[index].purl
          item.albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`
        return item
      })
       resolve(result)
    })
  })
}
// 获取歌词

export const getLyric=(mid)=>{
  var mid=mid||'0000Z0093Ko5Ps'
  let url=`/hehe/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${mid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1575700858860`
  return new Promise((resolve,reject)=>{
    axios.get(url)
    .then((data)=>{

      resolve(data)
    })
  })
}