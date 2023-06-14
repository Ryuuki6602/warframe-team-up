import { axiosService } from '../index'
import {
  registerFormModel,
  retriveFormModel,
  loginFormModel,
  nicknameFormModel
} from '@/models'

export const validateRegisterEmail = (email: string) => {
  return axiosService.post('/AccountController/validateRegisterEmail', {
    email: email
  })
}

export const getEmailCode = (email: string) => {
  return axiosService.post('/AccountController/getEmailCode', { email: email })
}

export const userRegister = (registerForm?: registerFormModel) => {
  return axiosService.post('/AccountController/userRegister', registerForm)
}

export const userLogin = (loginForm?: loginFormModel) => {
  return axiosService.post('/AccountController/userLogin', loginForm)
}

export const validateUserAccess = () => {
  return axiosService.post('/AccountController/validateUserAccess', null)
}

export const Logout = () => {
  return axiosService.post('/AccountController/Logout', null)
}

export const validateEmails = (email: string) => {
  return axiosService.post('/AccountController/validateEmails', {
    email: email
  })
}

export const validateEmailCode = (retriveForm?: retriveFormModel) => {
  return axiosService.post('/AccountController/validateEmailCode', retriveForm)
}

export const revisePassword = (retriveForm?: retriveFormModel) => {
  return axiosService.post('/AccountController/revisePassword', retriveForm)
}

export const isAdmin = () => {
  return axiosService.get('/AdminController/isAdmin')
}

export const activateBoost = (boost: any) => {
  return axiosService.post('/AccountController/activateBoost', boost)
}
export const deactivateBoost = (boost: any) => {
  return axiosService.post('/AccountController/deactivateBoost', boost)
}

export const getAccountBoostListByUUID = () => {
  return axiosService.get('/AccountController/getAccountBoostListByUUID')
}
