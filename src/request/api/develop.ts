import { axiosService } from '../index'

export const addIssue = (content: any) => {
  return axiosService.post('/IssueController/addIssue', content)
}

export const getIssue = () => {
  return axiosService.get('/IssueController/getIssue')
}

export const deleteIssueByIssueId = (issueId: string) => {
  return axiosService.post('/IssueController/deleteIssueByIssueId', {
    issueId: issueId
  })
}
