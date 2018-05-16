const app = getApp()

const API_BASE = 'https://sandbox.lekee.cc/wp-json'
const API_ROUTE = 'wp/v2/posts'

Page({
  data: {
    entities: [],
    embed: true,
    total: 0,
    totalPages: 0,
    currentPage: 1
  },
  onLoad () {
    wx.request({
      url: `${ API_BASE }/${ API_ROUTE }?_embed=${ this.data.embed }`,
      success: (response) => {
        console.log(response)
        const entities = response.data
        this.setData({
          entities,
          total: response.header['x-wp-total'],
          totalPages: response.header['x-wp-totalpages']
        })
      }
    })
  },
  onReachBottom () {
    let { currentPage, totalPages } = this.data

    if (currentPage >= totalPages) {
      return
    }

    currentPage = currentPage + 1

    wx.request({
      url: `${ API_BASE }/${ API_ROUTE }?_embed=${ this.data.embed }&page=${ currentPage }`,
      success: (response) => {
        console.log(response)
        const entities = [...this.data.entities, ...response.data]
        this.setData({
          entities,
          currentPage,
          total: response.header['x-wp-total'],
          totalPages: response.header['x-wp-totalpages']
        })
      }
    })
  }
})
