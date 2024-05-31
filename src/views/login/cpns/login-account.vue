<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'
// import localCache from '@/utils/cache'
import { rules } from '../config/account-config'
import useloginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? 'admin',
  password: localCache.getCache('password') ?? 'admin888'
})
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useloginStore()
const loginAction = (isKeepPassword: boolean) => {
  console.log(isKeepPassword)
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      localCache.setCache('name', account.name)
      localCache.setCache('password', account.password)
      // 登陆
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isKeepPassword) {
          localCache.setCache('name', account.name)
          localCache.setCache('password', account.password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
      // accountLoginRequest({ name, password }).then((res) => {
      //   console.log('res', res)
      // })
    } else {
      ElMessage.error('Oops，请输入正确的帐号密码')
    }
  })
}
defineExpose({
  account,
  formRef,
  loginAction
})
</script>

<style scoped></style>
