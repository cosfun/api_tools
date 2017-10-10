<template>
  <div class="content">
    <div>
    <el-dropdown @command="choose" trigger="click">
      <el-button  >
        {{selectName}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  v-for="item in appTableData" :command="item.name">{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button>GET</el-button>
      <el-input style="width: 160px;margin-left: 70px"></el-input>
      <el-input style="width: 160px;margin-left: 5px"></el-input>
      <el-button>请求</el-button>
      <el-radio-group v-model="radio" style="margin-left: 20px">
        <el-radio :label="1">默认</el-radio>
        <el-radio :label="2">本地</el-radio>
        <el-radio :label="3">服务</el-radio>
      </el-radio-group>
    </div>
    <el-row  >
      <el-col :span="4"> <el-table
        :data="postList"
        border
        style="width: 200px;margin-top:10px;height: 100%"
        @row-click='handleRowHandle'
      >
        <el-table-column
          prop="url"
          label="请求列表"
          width="120px">
        </el-table-column>
        <el-table-column
          label="状态"
          width="79px"
        >
          <template scope="scope"  >
            <span  v-if="scope.row.state==='true'" style="display:block;color: #FFFFFF;background-color: #20A0FF;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='false'" style="display:block;color: #FFFFFF;background-color: #13CE66;width: 100%;height: 100%" >{{scope.row.state}}</span>
            <span v-if="scope.row.state==='warn'" style="display:block;color: #FFFFFF;background-color: #F7BA2A;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='error'"style="display:block;color: #FFFFFF;background-color: #FF4949;width: 100%;height: 100%">{{scope.row.state}}</span>
          </template>
        </el-table-column>
      </el-table></el-col>
      <el-col :span="15">
        <el-table
          :data="params"
          border
          style="width: 100%;margin-top: 10px;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="key"
            width="300">
            <template scope="scope">
              <el-input v-model="scope.row.key"  size="small"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
          label="value"
          width="300">
            <template scope="scope">
              <el-input v-model="scope.row.value"  size="small"> </el-input>
            </template>
        </el-table-column>
          <el-table-column
            label="description"
            width="320">
            <template scope="scope">
              <el-input v-model="scope.row.desc"  size="small"> </el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="5" >
        <div style="margin-top: 10px">
        {{result}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
 export default {
   data:function(){
     return{
       appTableData:[],
       selectName:"",
       postList:[
         {url:"index",state:"true"},
         {url:"index",state:"error"},
         {url:"index",state:"false"},
         {url:"index",state:"warn"},
         {url:"index",state:"warn"},
         {url:"index324324324324",state:"warn"},
         {url:"index",state:"warn"},
         {url:"index",state:"warn"},
         {url:"index",state:"warn"},
         {url:"index",state:"warn"},
         {url:"index",state:"warn"},
         {url:"index",state:"warn"}

         ],
       radio: '1',
       params:[
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"},
         {key:"name",value:"value",desc:"des"}
       ],
       result:"dfdsfdsf\nsdfdsfds\ndsfdsf"
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
     if(localStorage.getItem("selectName")==null) {
       this.selectName = this.appTableData[0].name
     }else{
       this.selectName=localStorage.getItem("selectName")
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
     choose:function(value){
       this.selectName=value
       localStorage.setItem("selectName",this.selectName)
     },
     handleRowHandle:function(value){
       console.log(value.url)
     }
   }
 }
</script>
<style>
  .content{
    margin-left: 10px;
    margin-top: 10px;
  }

</style>
