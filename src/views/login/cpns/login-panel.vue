<template>
  <div class="login-panel">
    <h1 class="title">定时任务管理平台</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <div class="label">
            <el-icon><UserFilled /></el-icon>
            <span class="text"> 帐号登录</span>
          </div>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane disabled name="SSO">
        <template #label>
          <div class="label">
            <el-icon><Cellphone /></el-icon>
            <span class="text"> Sso</span>
          </div>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

// 1.定义属性
const isKeepPassword = ref(true)
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()
const currentTab = ref('account')
// 2.定义方法
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    console.log('phoneRef调用loginAction')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 100px;
  margin-left: 500px;
  width: 420px;

  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 5px;
    height: 40px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text {
    margin-left: 2px;
  }
}
</style>
