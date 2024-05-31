import zlRequest from '@/service'

/** 全部创建、更新、删除接口 */

export function postData(pageName: string, data: any) {
  return zlRequest.post({
    url: `${pageName}`,
    data: data
  })
}

// 新增
export function createData(data: any) {
  return zlRequest.post({
    url: '/tasks/save',
    data: data
  })
}

// 编辑
export function updateData(data: any) {
  return zlRequest.post({
    url: '/tasks/edit',
    data: data
  })
}

// 删除
export function deleteData(data: any) {
  return zlRequest.post({
    url: '/tasks/delete',
    data: data
  })
}
/** 全部查询接口 */

export function getPageListData(pageName: string, queryInfo: any) {
  return zlRequest.get({
    url: `${pageName}`,
    params: queryInfo
  })
}
