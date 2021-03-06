import axios from 'axios'

function request(url, data, method='POST', timeout=6000){
  let fullUrl = url;
  if(!url.startsWith('http')){
    fullUrl = `${SERVER_URL}/${url}`
  }

  // console.log('request:', fullUrl, method);
  return axios({
    method,
    url: fullUrl,
    timeout,
    data,

    // allow cookie
    // but in server Access-Control-Allow-Origin cann't be *
    withCredentials: true,
    // credentials: "same-origin",
    headers:{
      Accept: "application/json",
      "Cache-Control": "no-cache",
      'content-Type': 'application/json',
      // Cookie: " _gscu_1878775803=98833870pob5sh24; _gscbrs_1878775803=1; org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=zh_CN; Hm_lvt_608ef9e4b8cd3b7746392c721f2ef555=1598833871,1600831407; Hm_lpvt_608ef9e4b8cd3b7746392c721f2ef555=1600831407; c__utma=1557273461.1229285511.7340176657450576825.1600831405.1602207324.3; c__utmc=1557273461.1086021304; SESSION=1586f20c-c27a-4ff1-ab4b-59db59df2caf; Hm_lvt_908e7bcd23611cb15593312e094a8844=1600843777,1602211218,1602212340,1602213241; Hm_lpvt_908e7bcd23611cb15593312e094a8844=1602213241"
    }
  })
  // .then(response => {return response})
  // .catch(error => console.error('request error', error))
}


/*
 * get request. support object paramater
 */
function requestGet(url, data, timeout=6000){
  let fullUrl = url;
  if(!url.startsWith('http')){
    fullUrl = `${SERVER_URL}/${url}`
  }

  return axios.get(fullUrl,{
    withCredentials: true,
    params:{
      ...data,
    },
    timeout,
    // credentials: "same-origin",
    headers:{
      Accept: "application/json",
      "Cache-Control": "no-cache",
      'content-Type': 'application/json',
    }
  })
}

export { requestGet, request }
