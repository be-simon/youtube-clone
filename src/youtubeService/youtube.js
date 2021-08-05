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

  async getChannelWithId(id) {
    try {
      const res = await this.youtubeInst.get('channels', {
        params: {
          ...this.DEFAULT_PARAMS,
          part: 'snippet',
          id: id
        }
      })
      return res.data.items[0]
    } catch (err) {
      console.log(err)
    }
  }

  async getMostPopularVideos() {
    try {
      const videos = await this.youtubeInst.get('videos', {
        params: {
          ...this.DEFAULT_PARAMS,
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'KR'
        }
      })

      const items = await Promise.all(
        videos.data.items.map(async item => {
          const channel = await this.getChannelWithId(item.snippet.channelId)
          item.snippet["channelThumbnails"] = channel.snippet.thumbnails
          return item
      }))

      return items

    } catch (err) {
      console.log(err)
    }
  }
}

export default Youtube