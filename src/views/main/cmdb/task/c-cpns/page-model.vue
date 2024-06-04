<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新增任务' : '编辑任务'"
      width="50%"
      center
    >
      <div class="form">
        <el-form
          :model="formData"
          ref="ruleFormRef"
          label-width="80px"
          :rules="rules"
          size="large"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input
              v-model.trim="formData.name"
              placeholder="请输入任务名称"
            />
          </el-form-item>
          <el-form-item label="执行命令" prop="command">
            <el-input v-model="formData.command" placeholder="执行命令/脚本" />
          </el-form-item>
          <el-form-item label="定时时间" prop="cronExpr">
            <el-input
              v-model="formData.cronExpr"
              placeholder="定时时间,例如:*/1 * * * *"
            />
          </el-form-item>
          <el-form-item label="区域" prop="zk">
            <el-select
              v-model="formData.zk"
              style="width: 100%"
              placeholder="请选择区域"
            >
              <el-option label="国内" value="bjzk" />
              <el-option label="欧美" value="uszk" />
              <el-option label="日本" value="jpzk" />
              <el-option label="韩国" value="krzk" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick(ruleFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

import { reactive, ref } from 'vue'
import { rules } from './rule'
import { postData } from '@/service/main/global/global'

const ruleFormRef = ref<FormInstance>()

// 1.定义内部的属性
const dialogVisible = ref(false)

const formData = reactive<any>({
  name: '',
  command: '',
  cronExpr: '',
  zk: ''
})
const isNewRef = ref(true)
const editData = ref()
// const URL = ref('/user/list/')

function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      if (key === 'cronExpr') {
        formData[key] = '*/1 * * * *'
      } else {
        formData[key] = ''
      }
    }
    editData.value = null
  }
}
// 定义事件
const emit = defineEmits(['reloadClick'])

// 3.点击了确定的逻辑
function handleConfirmClick(formEl: FormInstance | undefined) {
  if (!formEl) return
  // 校验参数
  formEl.validate((valid) => {
    if (valid) {
      if (!isNewRef.value && editData.value) {
        // 编辑用户的数据
        const update = {
          ...formData
        }
        update['uniqueCode'] = editData.value['uniqueCode']
        console.log('更新数据', update, editData.value, formData)
        // systemStore.newUserDataAction(formData)
        postData('/tasks/edit', update).then((res) => {
          if (res.code == 200) {
            dialogVisible.value = false
            ElMessage({
              message: '更新成功.',
              type: 'success'
            })
            emit('reloadClick')
          }
        })
        // systemStore.editUserDataAction(editData.value.id, formData)
      } else {
        // 创建新新项目

        const createData = { ...formData }
        // systemStore.newUserDataAction(formData)
        postData('/tasks/save', createData).then((res) => {
          if (res.code == 200) {
            dialogVisible.value = false
            ElMessage({
              message: '创建成功.',
              type: 'success'
            })
            emit('reloadClick')
          }
        })
      }
    } else {
      return false
    }
  })
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
