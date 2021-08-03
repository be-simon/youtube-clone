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

  async getMostPopularVideos() {
    try {
      const res = await this.youtubeInst.get('videos', {
        params: {
          ...this.DEFAULT_PARAMS,
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'KR'
        }
      })

      return res.data.items
    } catch (err) {
      console.log(err)
    }
  }
}

export default Youtube