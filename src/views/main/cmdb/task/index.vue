<template>
  <div class="task">
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-model ref="modalRef" @reload-click="handleQueryClick" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageContent from './c-cpns/page-content.vue'
import PageModel from './c-cpns/page-model.vue'

// 对content组件的操作
const contentRef = ref<InstanceType<typeof PageContent>>()

// // 对modal组件的操作
const modalRef = ref<InstanceType<typeof PageModel>>()

//查询
function handleQueryClick() {
  contentRef.value?.fetchListData()
}

// 新增
function handleNewClick() {
  console.log('handleNewClick')
  modalRef.value?.setModalVisible()
}

// 编辑
function handleEditClick(itemData: any) {
  console.log('handleEditClick')

  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.task {
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    height: 100%;
  }

  .el-tabs--right .el-tabs__content,
  .el-tabs--left .el-tabs__content {
    height: 100%;
  }
}
</style>
