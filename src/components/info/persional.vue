<template>
  <div>
    <el-input v-model="phone" placeholder="请输入你的手机号"   class="phone"></el-input>
    <el-button v-on:click="login()">登陆</el-button>
    <div class="message" v-if="logined==1">
      当前状态:{{stateStr}}
    </div>
    <div class="message" v-if="logined==1">
      角色权限:{{roleStr}}
    </div>
    <div class="message" v-if="logined==1">
      角色认证:{{nameStr}}
    </div>
  </div>
</template>
<script>
  export default {
    data:function() {
      return {
        logined:"1",
        phone: "",
        stateStr:"未登陆",
        nameStr:"未认证",
        roleStr:"游客",
      }
    },
    mounted()
    {
      this.checkLogin()
    },
    methods:{
      checkLogin:function(){
        if(localStorage.getItem("phone")===null){
          this.stateStr="未登陆"
        }else{
          this.logined=1
          this.stateStr=localStorage.getItem("phone")
          this.phone=localStorage.getItem("phone")
          this.getUserInfo()
        }
      },
      login:function(){
        localStorage.setItem("phone", this.phone)
        this.$message('登陆账号'+this.phone);
        this.checkLogin()
      },
      getUserInfo:function(){
         this.$http.get(this.baseUrl+"/user?phone="+this.phone)
          .then((reponse)=>{
           console.log(reponse.data)
          if(reponse.data.success) {
            this.roleStr = reponse.data.role
            this.nameStr = reponse.data.name
          }
          })
          .catch((err)=>{
             console.log("error")
              console.log(err)
          })
      }
    }
  }

</script>
<style>
  .phone {
    margin-top: 15px;
    margin-left: 15px;
    width: auto;
  }
  .message{
    margin-top: 15px;
    margin-left: 15px;
  }
</style>
