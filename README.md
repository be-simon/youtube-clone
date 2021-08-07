# youtube Clone Project

## 개요
Youtube Data API v3 를 이용한 youtube clone 프로젝트

## 사용 언어, 기술
* html, css, javascript
* React.js
* postCSS


# Project Issues
# 210803 axios로 youtube api 통신
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
* youtube api에 key를 axios instance에 기본 param으로 설정해두고 사용하려했는데 request param과 merge되지 않는다.
  * 어쩐지 자꾸 응답이 403이라서 어디가 문제인가 했더니 api key가 누락되고 있었다.
  * 0.18은 알아서 해줬다는데...
  * 일단은 deconstructing으로 해결
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

# 210805 하위 컴포넌트에서 api 통신?
* 홈화면에서 content list 를 그릴 때 채널 썸네일이 필요한데 youtube api/videos 의 응답에는 채널의 id만 존재한다.
- 그러면 app/contentList/content 에서 각각의 content가 독립적으로 채널 썸네일을 받아올 것인가?
- 아니면 youtubeService 객체에서 video 데이터를 받아올 때 일괄적으로 받아서 가공해줄지?

* 각 컴포넌트는 역할이 세분화되는 것이 좋다.
- 로직을 처리하는 컴포넌트(js 모듈이나) 와 그냥 UI만 그려주는 컴포넌트를 구분하는 것이 좋을 것 같다.
- 그리고 하위 컴포넌트도 api 통신을 하면 state를 가져야할건데 이렇게 되면 나중에 복잡해질 것 같다.
- 하위 컴포넌트는 그냥 UI만 그리게 하고 service 객체에서 로직을 수정하기로 했다.

* 참고
[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.3b0dbutob)


# 210806 api 통신 횟수 줄이기
* youtube api/channels 에서 param을 전달할 때 id값을 콤마로 구분해서 여러개 전달하면 한번에 결과를 얻을 수 있었다.
- 기존에는 하나씩만 되는 줄 알고 20개의 컨텐츠를 그리기 위해 /videos 한번, 채널 썸네일 불러오기 위해 /channels 20번, 총 21번의 api 통신을 하고 있어서 매우 비효율적이다.
- /videos 의 결과로 얻은 컨텐츠들의 channelId를 모아 channel 통신 메소드를 이용해 한번에 채널 데이터를 받아오자.
- /channels 에 전달해준 id 배열 순서대로 응답이 오는게 아니라서.. 그에 맞게 매칭을 해줘야했다.
```
const channelIds = videos.data.items.map(v => {
        return v.snippet.channelId
      })

      const channelInfos = await this.getChannelsWithId(channelIds)      

      const videoItems = videos.data.items.map(v => {
        for (let c of channelInfos) {
          if (v.snippet.channelId === c.id) {
            v.snippet['channelThumbnails'] = c.snippet.thumbnails
            break
          }
        }
        return v
      })
```
