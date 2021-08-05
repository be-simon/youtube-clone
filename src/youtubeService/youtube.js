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

      const items = videos.data.items.map(item => {
        const channelThumbnails = this.getChannelWithId(item.id).snippet.thumbnails
        return {...item, "channelThumbnails": channelThumbnails}
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default Youtube