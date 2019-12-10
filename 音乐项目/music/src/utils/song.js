export const getAvatorUrl=(mid)=>{
  var mid=mid||'002J4UUk29y8BY'
  return  `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
}
export const songData=(data)=>{
  let list=[]
  let tmp=data.map((item,index)=>{
    // 判断歌曲的播放权限
    if(item.musicData.vid!==''){
      let {albummid,albumname,songmid,songname,singer,interval}=item.musicData
      list.push({albummid,albumname,songmid,songname,singer,interval})
    }
    return item
  })
  return list 
}