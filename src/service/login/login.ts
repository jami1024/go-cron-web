import type { IAccount } from '@/types'
import zlRequest from '../index'

export function accountLoginRequest(account: IAccount) {
  return zlRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return zlRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: number) {
  return zlRequest.get({
    url: `/role/${id}/menu`
  })
}
