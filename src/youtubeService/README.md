# axios

[axios github page](https://github.com/axios/axios)

### axios 기본 사용
```bash
yarn add axios
```

```jsx
const axios = require('axios');

axios.get('url', {
    params: {
      id: 123,
    }
  })
  .then(() => {

  })
  .catch(function(error) {

  })

// async 를 쓴다면
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

### axios 0.19 버전에서의 문제

- youtube api에 key를 axios instance에 기본 param으로 설정해두고 사용하려했는데 request param과 merge되지 않는다.
    - 어쩐지 자꾸 응답이 403이라서 어디가 문제인가 했더니 api key가 누락되고 있었다.  
    - 0.18은 알아서 해줬다는데...
- 일단은 deconstructing으로  해결

```jsx
class Youtube() {
  constructor(apikey) {
    // default param object를 만들어둔다
    this.DEFAULT_PARAMS = {
      key: apikey
    }
  ...
  
  async getChannelWithId(ids) {
    try {
      const res = await this.youtubeInst.get('channels', {
        // 요청할 때 key를 넣어준다.
        // 뭔가 깔끔한 느낌은 아니다 ㅠ
        params: {
          ...this.DEFAULT_PARAMS,
          part: 'snippet',
          id: ids.toString()
        }
      })
      return res.data.items
    } catch (err) {
      console.log(err)
    }
  }
}
```
