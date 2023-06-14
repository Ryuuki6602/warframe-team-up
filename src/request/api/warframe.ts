import { warframeService } from '../index'
import { axiosService } from '../index'
import type { relics } from '@models'

export const getPcWorldState = () => {
  return warframeService.get('/pc', 'language=zh')
}

export const reloadFissureList = () => {
  return warframeService.get('/pc/fissures', 'language=zh')
}

export const getPcEarthCycle = () => {
  return warframeService.get('/pc/cetusCycle', 'language=zh')
}
export const getPcCetusCycle = () => {
  return warframeService.get('/pc/cetusCycle', 'language=zh')
}
export const getPcVallisCycle = () => {
  return warframeService.get('/pc/vallisCycle', 'language=zh')
}
export const getPcCambionCycle = () => {
  return warframeService.get('/pc/cambionCycle', 'language=zh')
}
export const getPcVoidTrader = () => {
  return warframeService.get('/pc/voidTrader', 'language=zh')
}
export const getPcArchonHuntData = () => {
  return warframeService.get('/pc/archonHunt', 'language=zh')
}

export const getLithRelics = () => {
  return warframeService.get(
    '/items/search/古纪',
    'by=name&remove=imageName,locations,marketInfo,patchlogs'
  )
}

export const getMesoRelics = () => {
  return warframeService.get(
    '/items/search/前纪',
    'by=name&remove=imageName,locations,marketInfo,patchlogs'
  )
}

export const getNeoRelics = () => {
  return warframeService.get(
    '/items/search/中纪',
    'by=name&remove=imageName,locations,marketInfo,patchlogs'
  )
}

export const getAxiRelics = () => {
  return warframeService.get(
    '/items/search/后纪',
    'by=name&remove=imageName,locations,marketInfo,patchlogs'
  )
}
export const getRequiemRelics = () => {
  return warframeService.get(
    '/items/search/安魂',
    'by=name&remove=imageName,locations,marketInfo,patchlogs'
  )
}

export const getRelics = () => {
  return warframeService.get(
    '/items/search/Relics',
    'by=category&remove=imageName,locations,marketInfo,patchlogs'
  )
}

export const dropAllRelics = () => {
  return axiosService.post('/RelicController/dropAllRelics')
}

export const uploadAllRelics = (AllRelics: Array<relics>) => {
  return axiosService.post('/RelicController/uploadAllRelics', AllRelics)
}
