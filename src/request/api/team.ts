import { axiosService } from '../index'
import { createTeamsFormModel } from '@/models'

export const createTeam = (createTeamForm?: createTeamsFormModel) => {
  return axiosService.post('/TeamController/createTeam', createTeamForm)
}

export const getTeams = (fissureId: string) => {
  return axiosService.post('/TeamController/getTeams', { fissureId: fissureId })
}

export const removeTeamByUuid = (teamUUID: string) => {
  return axiosService.post('/TeamController/removeTeamByUuid', {
    teamUUID: teamUUID
  })
}
export const getMyTeams = () => {
  return axiosService.post('/TeamController/getMyTeams', null)
}
