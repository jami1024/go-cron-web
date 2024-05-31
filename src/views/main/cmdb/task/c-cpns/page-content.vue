<template>
  <div class="content">
    <div class="header">
      <h3 class="title">任务列表:共{{ currentTotal }}个</h3>
      <el-button type="primary" @click="handleNewClick">新增任务</el-button>
    </div>
    <div class="table">
      <el-table :data="projectList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column align="center" label="任务名称" prop="name" />
        <el-table-column align="center" label="执行命令/脚本" prop="command" />
        <el-table-column
          align="center"
          label="时间"
          prop="cronExpr"
          width="150px"
        />
        <el-table-column align="center" label="区域" prop="zk" width="150px">
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="WarnTriangleFilled"
              icon-color="#626AEF"
              title="此操作将永久删除, 是否继续?"
              @confirm="handleDeleteBtnClick(scope.row)"
            >
              <template #reference>
                <el-button size="small" icon="Delete" type="danger" text
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { formatUTC, formatTime } from '@/utils/format'
import { computed, ref } from 'vue'
import { WarnTriangleFilled } from '@element-plus/icons-vue'

import { postData, getPageListData } from '@/service/main/global/global'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

const projectList = ref([])
const projectTotalCount = ref(0)
const URL = ref('/tasks/list')
fetchListData()

// 一个计算属性
const currentTotal = computed(() => {
  return projectList.value.length
})

// 4.定义函数, 用于发送网络请求
function fetchListData(formData: any = {}) {
  // 2.发起网络请求
  const queryInfo = { ...formData }
  getPageListData(URL.value, queryInfo).then((res) => {
    projectList.value = res.data
    projectTotalCount.value = res.count
  })
}

function handleNewClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
// 5.删除/
function handleDeleteBtnClick(itemData: any) {
  // systemStore.deleteUserByIdAction(id)
  const data = { ...itemData }
  console.log('删除数据', data)
  postData('/tasks/delete', data).then((res) => {
    fetchListData()
  })
}

// 暴露给父组件
defineExpose({ fetchListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
