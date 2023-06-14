import { focus } from '@common'
import type { focusModel } from '@models'

export const getFocusName = (focusCode: number): string => {
  return focus.find((item: focusModel) => item.code === focusCode).name
}

export const getFocusCode = (focusName: String): number => {
  return focus.find((item: focusModel) => item.name === focusName).code
}
