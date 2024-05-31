import zlRequest from '@/service'

export function getEntireRoles() {
  return zlRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return zlRequest.post({
    url: '/department/list'
  })
}
