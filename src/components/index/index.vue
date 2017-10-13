<template>
  <div>
    <h1 class="title">快速使用指南</h1>
  <el-collapse class="content" >
    <el-collapse-item title="注册账号" name="1">
      <div>不需要注册，只用在 设置>我的信息 中填入你的手机号后登陆。</div>
      <div>请不要冒充他人或随意填写。(根据你的账号联系反馈问题)</div>
    </el-collapse-item>
    <el-collapse-item title="如何使用" name="2">
      <div>将鼠标移动到按钮上，会有悬停说明</div>
      <div></div>
    </el-collapse-item>
    <el-collapse-item title="有哪些功能" name="3">
      <div>提交接口BUG查看BUG状态，查看接口历史参数结果，查看历史接口json,sql</div>
      <div></div>
    </el-collapse-item>
  </el-collapse>
  </div>
</template>
<style>
  .title {
    margin-left: 20px;
  }
  .content {
    margin: 5px;
  }
</style>
