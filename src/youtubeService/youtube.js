const axios = require('axios');

class Youtube {
  constructor(apikey) {
    this.DEFAULT_PARAMS = {
      key: apikey
    }
    this.youtubeInst = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      timeout: 1000,
    })
  }

  async getChannelsWithId(ids) {
    // youtube channel API 에서 id로 채널 정보를 가져오는 메소드
    // param ids : 채널 id가 담긴 Array
    
    try {
      const res = await this.youtubeInst.get('channels', {
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

  async getMostPopularVideos() {
    try {
      const videos = await this.youtubeInst.get('videos', {
        params: {
          ...this.DEFAULT_PARAMS,
          part: 'snippet, contentDetails, statistics',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'KR'
        }
      })

      const channelIds = videos.data.items.map(v => {
        return v.snippet.channelId
      })

      const channelInfos = await this.getChannelsWithId(channelIds)      

      const videoItems = videos.data.items.map(v => {
        for (let c of channelInfos) {
          if (v.snippet.channelId == c.id) {
            v.snippet['channelThumbnails'] = c.snippet.thumbnails
            break
          }
        }
        return v
      })

      return videoItems

    } catch (err) {
      console.log(err)
    }
  }
}

export default Youtube