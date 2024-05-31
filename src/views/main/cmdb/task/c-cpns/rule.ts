// 编写好规则
export const rules = {
  name: [
    {
      required: true,
      message: '任务名称是必传内容~',
      trigger: 'blur'
    }
  ],
  command: [
    {
      required: true,
      message: '执行命令和脚本是必传内容~',
      trigger: 'blur'
    }
  ],
  cronExpr: [
    {
      required: true,
      message: '时间是必传内容~',
      trigger: 'blur'
    }
  ],
  zk: [
    {
      required: true,
      message: '区域是必传内容~',
      trigger: 'blur'
    }
  ]
}
