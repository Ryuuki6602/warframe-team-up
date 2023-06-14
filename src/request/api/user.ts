import { axiosService } from '../index'
import { nicknameFormModel } from '@/models'

export const updateNickname = (nicknameForm?: nicknameFormModel) => {
  return axiosService.post('/UserController/updateNickname', nicknameForm)
}

export const updateMyState = (state: number) => {
  return axiosService.post('/UserController/updateMyState', { state: state })
}
