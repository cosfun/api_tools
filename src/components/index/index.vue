<template>
  <div>
    <h1 class="title">快速使用指南</h1>
  <el-collapse class="content" >
    <el-collapse-item title="注册账号" name="1">
      <div>不需要注册，只用在 设置>我的信息 中填入你的手机号后登陆。</div>
      <div>请不要冒充他人或随意填写。(会根据你的账号联系你反馈问题)</div>
    </el-collapse-item>
    <el-collapse-item title="反馈 Feedback" name="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
    <el-collapse-item title="效率 Efficiency" name="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    </el-collapse-item>
    <el-collapse-item title="可控 Controllability" name="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
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
