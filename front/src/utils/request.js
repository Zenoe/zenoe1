import axios from 'axios'

// https://axios-http.com/docs/config_defaults
// Config order of precedence
// Config will be merged with an order of precedence. The order is library defaults found in lib/defaults.js, then defaults property of the instance, and finally config argument for the request. The latter will take precedence over the former.
// const instance = axios.create();
// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
// instance.defaults.timeout = 2500;
// Override timeout for this request as it's known to take a long time
// instance.get('/longRequest', {
//   timeout: 5000
// });

// default axios settings
axios.defaults.baseURL = SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

function request(url, data, method='POST', timeout=6000){
  return axios({
    method,
    url,
    timeout,
    data,

    // allow cookie
    // but in server Access-Control-Allow-Origin cann't be *
    withCredentials: true,
    // credentials: "same-origin",
    headers:{
      Accept: "application/json",
      "Cache-Control": "no-cache",
      // Cookie: " _gscu_1878775803=98833870pob5sh24; _gscbrs_1878775803=1; org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=zh_CN; Hm_lvt_608ef9e4b8cd3b7746392c721f2ef555=1598833871,1600831407; Hm_lpvt_608ef9e4b8cd3b7746392c721f2ef555=1600831407; c__utma=1557273461.1229285511.7340176657450576825.1600831405.1602207324.3; c__utmc=1557273461.1086021304; SESSION=1586f20c-c27a-4ff1-ab4b-59db59df2caf; Hm_lvt_908e7bcd23611cb15593312e094a8844=1600843777,1602211218,1602212340,1602213241; Hm_lpvt_908e7bcd23611cb15593312e094a8844=1602213241"
    }
  })
  // .then(response => {return response})
  // .catch(error => console.error('request error', error))
}

/*
 * get request. support object paramater
 */
function requestGet(url, data, timeout=30000){
  return axios.get(url,{
    withCredentials: true,
    params:{
      ...data,
    },
    timeout,
    // credentials: "same-origin",
    headers:{
      Accept: "application/json",
      "Cache-Control": "no-cache",
    }
  })
}

function requestUpload(file, onUploadProgress) {
  const options = {
    timeout: 10000,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      //'Authorization': 'token'
    },
    onUploadProgress,
  }
  let data = new FormData();
  data.append("file", file);

  return axios.post('api/utils/upload', data, options)
}

export { requestGet, request, requestUpload }
