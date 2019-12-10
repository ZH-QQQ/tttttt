import axios from 'axios'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log('请求拦截器')
  // console.log(config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('响应拦截器')
  // console.log(response)

  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
export default axios

