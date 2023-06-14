import { axiosService } from '../index'

export const exchangePost = (post: any) => {
  return axiosService.post('/MarketController/exchangePost', post)
}

export const getMySwap = () => {
  return axiosService.get('/MarketController/getMySwap')
}

export const removeMySwapPost = (swapUuid: string) => {
  return axiosService.post('/MarketController/removeMySwapPost', {
    swapUuid: swapUuid
  })
}

export const getTennoSwapPost = () => {
  return axiosService.get('/MarketController/getTennoSwapPost')
}
