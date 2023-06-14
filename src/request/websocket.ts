class MyWebsocket {
  private wss: WebSocket

  private AdvancedUrl: string

  constructor(endpoint: any) {
    this.AdvancedUrl = 'wss://www.neorae.cn:7676' + endpoint
    this.wss = new WebSocket(this.AdvancedUrl)
  }

  create = (data: any) => {
    this.wss.send('create-' + JSON.stringify(data))
  }

  delete = (data: any) => {
    this.wss.send('delete-' + JSON.stringify(data))
  }

  update = (data: any) => {
    this.wss.send('update-' + JSON.stringify(data))
  }

  add = (data: any) => {
    this.wss.send('add-' + JSON.stringify(data))
  }

  init = () => {
    return this.wss
  }

  close() {
    this.wss.close()
  }

  // 建立连接
}

export default MyWebsocket
