const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

const key = '95317469bf1d4338ac63337361de3d04'
const endpoint = 'https://api.cognitive.microsofttranslator.com'

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
const location = 'eastasia'

async function translate (_zhText) {
  const response = await axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      // location required if you're using a multi-service or regional (not global) resource.
      'Ocp-Apim-Subscription-Region': location,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    params: {
      'api-version': '3.0',
      from: 'en',
      to: ['zh-Hans']
    },
    data: [{
      text: _zhText
    }],
    responseType: 'json'
  })

  // console.log(JSON.stringify(response.data, null, 4))
  return JSON.stringify(response.data, null, 4)
}

module.exports = {
  translate
}
