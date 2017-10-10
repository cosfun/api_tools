<template>
  <div>
    <el-input v-model="appname" placeholder="请输入项目名"   class="input"></el-input>
    <el-button type="primary" :disabled="true">添加项目</el-button>
    <div>
      <el-button class="input" @click="saveSet()">保存设置</el-button>
      <el-button class="input" @click="backSet()">更新设置</el-button>
    </div>
    <el-table
      class="table"
      :data="appTableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名"
        width="180">

      </el-table-column>
      <el-table-column
        label="本地地址">
        <template scope="scope">
          <el-input v-model="scope.row.appUrl" > </el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="服务器地址">
        <template scope="scope">
          <el-input v-model="scope.row.webUrl" > </el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data:function(){
      return{
        appname:"",
        appTableData:[]
      }
    },
    mounted(){
       if(localStorage.getItem("applist")==null) {
        console.log("null")
        this.getApp()
       }else{
         console.log(JSON.parse(localStorage.getItem("applist")))
         this.appTableData=JSON.parse(localStorage.getItem("applist"))
        }
    },
    methods:{
      getApp:function(){
         this.$http.get(this.baseUrl+"/app")
          .then((reponse)=>{
            if(reponse.data.success){
              this.appTableData=reponse.data.list
            }
            console.log(this.tableData)
          })
          .catch((err)=>{

          })
      },
      saveSet:function(){
        localStorage.setItem("applist",JSON.stringify(this.appTableData))
        this.$message("保存成功");
      },
      backSet:function(){
        this.getApp()
        this.$message("还原成功");
        localStorage.setItem("applist",JSON.stringify(this.appTableData))
      }
    }
  }
</script>
<style>
  .input {
    margin-top: 15px;
    margin-left: 15px;
    width: auto;
  }
  .table {
    margin-top: 15px;
    margin-left: 15px;
  }
</style>
