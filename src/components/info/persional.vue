<template>
  <div>
    <el-input v-model="input" placeholder="请输入你的手机号"  maxlength="11" class="phone"></el-input>



  </div>
</template>
<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
</script>
<style>
  .phone {
    margin-top: 10px;
    width: auto;
  }
</style>
