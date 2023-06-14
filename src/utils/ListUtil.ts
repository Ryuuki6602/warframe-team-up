import { warframes, focus } from '../common'
import type { warframeModel, focusModel } from '@/models'

export const searchWarframe = (param: string) => {
  let reg: RegExp = new RegExp('^' + param, 'gi')
  let res: warframeModel = []
  warframes.forEach((element) => {
    if (element.name.match(reg) !== null) {
      res.push(element)
    }
  })
  return res
}

export const searchFocus = (param: string): Array<focusModel> => {
  let reg: RegExp = new RegExp('^' + param, 'gi')
  let res: focusModel = []
  focus.forEach((element) => {
    if (element.name.match(reg) !== null) {
      res.push(element)
    }
  })
  return res
}

export const removeArrtibute = (arr: Array<string>, attr: string) => {
  let res = arr.filter((item) => {
    return item !== attr
  })
  return res
}

export const getArttribute = (
  arr: Array<string>,
  attr: Array<string>
): Array<string> => {
  let res: Array<string> = []
  attr.forEach((element) => {
    if (arr.includes(element)) {
      res.push(element)
    }
  })
  return res
}
